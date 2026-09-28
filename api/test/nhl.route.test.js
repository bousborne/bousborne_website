// Dependency-free route regression tests: node api/test/nhl.route.test.js
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const player = {
  firstName: { default: 'Alex' }, lastName: { default: 'Ovechkin' },
  featuredStats: { season: 20252026, regularSeason: { subSeason: { goals: 32, gamesPlayed: 82 } } },
  careerTotals: { regularSeason: { goals: 929 } }
};

function game(days, state = 'FUT', scheduleState = 'OK') {
  return { startTimeUTC: new Date(Date.now() + days * 86400000).toISOString(),
    gameState: state, gameScheduleState: scheduleState,
    awayTeam: { placeName: { default: 'Washington' }, commonName: { default: 'Capitals' } },
    homeTeam: { placeName: { default: 'Carolina' }, commonName: { default: 'Hurricanes' } } };
}

async function request(playerReply, scheduleReply) {
  let handler;
  const calls = [];
  const router = { get(route, callback) { assert.equal(route, '/summary'); handler = callback; } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../routes/nhl.route.js'), 'utf8'), {
    module: { exports: {} }, console: { error() {} },
    require(name) {
      if (name === 'express') return { Router: () => router };
      assert.equal(name, 'node-fetch');
      return async (url, options) => {
        assert.equal(options.timeout, 8000);
        calls.push(url);
        const reply = url.endsWith('/landing') ? playerReply : scheduleReply;
        if (reply instanceof Error) throw reply;
        return { ok: reply !== 503, status: reply === 503 ? 503 : 200, json: async () => reply };
      };
    }
  });
  const response = { code: 200, status(code) { this.code = code; return this; },
    json(body) { this.body = JSON.parse(JSON.stringify(body)); } };
  await handler({}, response);
  assert.deepEqual(calls.sort(), ['https://api-web.nhle.com/v1/club-schedule-season/WSH/now',
    'https://api-web.nhle.com/v1/player/8471214/landing'].sort());
  return response;
}

async function main() {
  const next = game(2);
  const success = await request(player, { games: [game(5), game(-2), game(1, 'OFF'),
    game(1, 'FUT', 'PPD'), next] });
  assert.equal(success.code, 200);
  assert.equal(success.body.season, '20252026');
  assert.equal(success.body.seasonGoals, 32);
  assert.equal(success.body.careerGoals, 929);
  assert.equal(success.body.goalsPerGame, 32 / 82);
  assert.equal(success.body.nextGame.startTimeUTC, next.startTimeUTC);
  assert.equal(success.body.nextGame.homeTeam, 'Carolina Hurricanes');

  const offseason = await request(player, { games: [] });
  assert.equal(offseason.body.nextGame, null);
  assert.equal(offseason.body.scheduleAvailable, true);

  const scheduleOffline = await request(player, new Error('timeout'));
  assert.equal(scheduleOffline.code, 200);
  assert.equal(scheduleOffline.body.careerGoals, 929);
  assert.equal(scheduleOffline.body.scheduleAvailable, false);

  const preseason = JSON.parse(JSON.stringify(player));
  preseason.featuredStats.regularSeason.subSeason = { goals: 0, gamesPlayed: 0 };
  const zeroGames = await request(preseason, { games: [] });
  assert.equal(zeroGames.body.seasonGoals, 0);
  assert.equal(zeroGames.body.goalsPerGame, null);

  delete preseason.featuredStats;
  const noSeason = await request(preseason, { games: [] });
  assert.equal(noSeason.body.season, null);
  assert.equal(noSeason.body.careerGoals, 929);

  const unavailable = await request(503, { games: [] });
  assert.equal(unavailable.code, 502);
  assert.match(unavailable.body.message, /temporarily unavailable/);
  const invalid = await request({}, { games: [] });
  assert.equal(invalid.code, 502);
  console.log('NHL route: 7 scenarios passed');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
