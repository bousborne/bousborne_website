const crypto = require('crypto');

let secret = process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'production' && (!secret || secret.length < 32)) {
  throw new Error('Production requires JWT_SECRET with at least 32 characters');
}
// Development sessions expire after a restart unless JWT_SECRET is supplied.
secret = secret || crypto.randomBytes(32).toString('hex');

module.exports = {
  connectionString: process.env.MONGODB_URI || 'mongodb://mongodb:27017/benousbornecom',
  secret,
  email: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    ssl: process.env.SMTP_SSL !== 'false'
  }
};
