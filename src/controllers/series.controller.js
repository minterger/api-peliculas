const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");
const mainCtrl = {};

const getDate = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${day}/${month}/${year}`;
};

const response = async (data, req, res, date) => {
  if (data.status) {
    res.status(data.status);
    res.json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
  } else {
    res.status(200);
    await redisSet(req.originalUrl, JSON.stringify({ data, date }));
    res.json(data);
  }
};

mainCtrl.renderSeries = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series${page}`);
  response(data, req, res, date);
};

mainCtrl.seriesEstrenos = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/estrenos${page}`);
  response(data, req, res, date);
};

mainCtrl.seriesPopulares = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/populares${page}`);
  response(data, req, res, date);
};

mainCtrl.getInfoSerie = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await getInfo(`/serie/${req.params.serie}`);
  response(data, req, res, date);
};

mainCtrl.reqSeasons = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await reqSeasons(`/serie/${req.params.serie}`);
  response(data, req, res, date);
};

mainCtrl.repSeries = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await reqRepro(
    `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res, date);
};

module.exports = mainCtrl;
