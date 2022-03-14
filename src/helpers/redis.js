const { redisGet, redisSet } = require("../redis");

/**
 * get data from redis if exists
 * @param {Object} req request object from express
 * @param {Object} res response object from express
 * @returns reply from redis or data from api
 */
const getForRedis = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  return reply || null;
};

/**
 * set data to redis
 * @param {Object} req request object from express
 * @param {Object} res response object from express
 * @param {Object} reply reply from redis
 * @param {Object} data data from api
 * @returns
 */
const saveOnRedis = async (req, res, reply, data) => {
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

module.exports = { getForRedis, saveOnRedis };
