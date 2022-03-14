const redis = require("redis");

let client;

(async () => {
  client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
  });

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.log(err);
  });

  await client.connect();
})();

const redisGet = async (key) => {
  return await client.get(key);
};

const ttl = async (key) => {
  return await client.ttl(key);
};

const redisSet = async (key, value) => {
  //client.set con ttl de 1 dia
  return await client.set(key, value, { EX: 86400 });
};

module.exports = { redisGet, redisSet, ttl };
