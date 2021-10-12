const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => {
  console.log(err);
})

const redisGet = promisify(client.get).bind(client);

const redisSet = promisify(client.set).bind(client);

module.exports = { redisGet, redisSet };
