const redis = require("redis");

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

(async () => {
  client.on("error", (err) => {
    console.log(err);
  });

  await client.connect();
})();

const redisGet = async (key) => {
  return await client.get(key);
};

const redisSet = async (key, value) => {
  return await client.set(key, value);
};

module.exports = { redisGet, redisSet };
