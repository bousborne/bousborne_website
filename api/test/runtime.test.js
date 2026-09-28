// Dependency-free regression checks for startup and HTTP recovery behavior.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load(relativePath, modules, env) {
  const filename = path.join(__dirname, '..', relativePath);
  const sandbox = {
    module: { exports: {} },
    require(name) {
      assert(Object.prototype.hasOwnProperty.call(modules, name), 'Unexpected require: ' + name);
      return modules[name];
    },
    process: { env: env || {} },
    console: { log() {} },
    __dirname: path.dirname(filename)
  };
  sandbox.global = sandbox;
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), sandbox, { filename });
  return sandbox.module.exports;
}

const runtimeModules = { crypto: require('crypto') };
assert.throws(() => load('runtime-config.js', runtimeModules, { NODE_ENV: 'production' }), /requires JWT_SECRET/);
assert.throws(() => load('runtime-config.js', runtimeModules, { NODE_ENV: 'production', JWT_SECRET: 'short' }), /requires JWT_SECRET/);
const runtime = load('runtime-config.js', runtimeModules, {
  NODE_ENV: 'production', JWT_SECRET: 'x'.repeat(32), MONGODB_URI: 'mongodb://override/site'
});
assert.strictEqual(runtime.connectionString, 'mongodb://override/site');
assert.strictEqual(runtime.secret, 'x'.repeat(32));
assert.strictEqual(load('runtime-config.js', runtimeModules).secret.length, 64);
const dbModules = { './runtime-config': runtime, './models/User': {} };
assert.strictEqual(load('DB.js', dbModules).DB, 'mongodb://override/site');

function startServer(env) {
  const routes = {};
  const calls = { connections: [], ddns: 0 };
  const logger = { log() {} };
  const mongoose = {
    connection: { readyState: 0 },
    connect(uri) { calls.connections.push(uri); return { then() {} }; }
  };
  const app = {
    use() {},
    get(route, handler) { routes[route] = handler; },
    listen(port, callback) { calls.port = port; callback(); }
  };
  const modules = {
    express: () => app,
    path,
    'body-parser': { json() {}, urlencoded() {} },
    cors() {},
    mongoose,
    './DB': { DB: 'mongodb://test/site' },
    'node-cron': {},
    './_helpers/jwt': () => {},
    './_helpers/error-handler': () => {},
    './_helpers/updateIP': () => { calls.ddns++; },
    './routes/log.route': logger,
    './users/users.controller': {},
    './webcamStartupDB': { cams: () => [] },
    './models/Webcam': {}
  };
  ['image', 'webcam', 'nhl', 'email'].forEach(name => { modules['./routes/' + name + '.route'] = {}; });
  load('server.js', modules, env);
  return { routes, calls, mongoose };
}

function response() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

const running = startServer({ NODE_ENV: 'production', PORT: '8080' });
assert.strictEqual(running.calls.port, '8080');
assert.deepStrictEqual(running.calls.connections, ['mongodb://test/site']);
assert.strictEqual(running.calls.ddns, 0);
let res = response();
running.routes['/healthz']({}, res);
assert.strictEqual(res.statusCode, 503);
assert.strictEqual(res.body.database, 'disconnected');
running.mongoose.connection.readyState = 1;
res = response();
running.routes['/healthz']({}, res);
assert.strictEqual(res.statusCode, 200);
assert.strictEqual(res.body.status, 'ok');
assert.strictEqual(startServer({ NODE_ENV: 'production' }).calls.port, 80);
assert.strictEqual(startServer({ PORT: '4100' }).calls.port, '4100');
assert.strictEqual(startServer({}).calls.port, 4000);
assert.strictEqual(startServer({ ENABLE_DDNS: 'true' }).calls.ddns, 1);
assert.strictEqual(startServer({ ENABLE_DDNS: 'false' }).calls.ddns, 0);

let logHandler;
let writeError;
const router = { route() { return { post(handler) { logHandler = handler; } }; } };
function express() { return { use() {} }; }
express.Router = () => router;
const logRoute = load('routes/log.route.js', {
  express,
  'node-fetch': {},
  'body-parser': { json() {}, urlencoded() {} },
  fs: { appendFile(file, data, callback) { callback(writeError); } },
  http: {},
  cors() {},
  '../models/LogEntry': {}
});
res = response();
logHandler({ body: { entryStringObj: 'test entry' } }, res);
assert.strictEqual(res.statusCode, 200);
assert.strictEqual(res.body, true);
res = response();
logHandler({ body: {} }, res);
assert.strictEqual(res.statusCode, 400);
writeError = new Error('read-only filesystem');
res = response();
logHandler({ body: { entryStringObj: 'test entry' } }, res);
assert.strictEqual(res.statusCode, 500);
assert.doesNotThrow(() => logRoute.log('server log failure must not crash'));

let emailHandler;
function emailExpress() { return {}; }
emailExpress.Router = () => ({ route() { return { post(handler) { emailHandler = handler; } }; } });
load('routes/email.route.js', { express: emailExpress, '../runtime-config': { email: {} } });
res = response();
emailHandler({ body: {} }, res);
assert.strictEqual(res.statusCode, 503);

let cronExpression;
let hasScript = true;
const updateIP = load('_helpers/updateIP.js', {
  'node-cron': { schedule(expression) { cronExpression = expression; } },
  fs: { existsSync() { return hasScript; } },
  path,
  '../routes/log.route': { log() {}, error() {} }
});
updateIP();
assert.strictEqual(cronExpression, '0 */6 * * *');
hasScript = false;
assert.throws(() => updateIP(), /explicitly mounted api\/godaddy.sh/);
console.log('Runtime regression checks passed');
