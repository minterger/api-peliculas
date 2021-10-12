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

mainCtrl.renderAnimes = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes${page}`);
  response(data, req, res, date);
};

mainCtrl.animesEstrenos = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/estrenos${page}`);
  response(data, req, res, date);
};

mainCtrl.animesPopulares = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/populares${page}`);
  response(data, req, res, date);
};

mainCtrl.getInfoAnime = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const data = await getInfo(`/anime/${req.params.anime}`);
  response(data, req, res, date);
};

mainCtrl.reqSeasons = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const data = await reqSeasons(`/anime/${req.params.anime}`);
  response(data, req, res, date);
};

mainCtrl.repAnime = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const data = await reqRepro(
    `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res, date);
};

module.exports = mainCtrl;
