const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
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

mainCtrl.renderPeliculas = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas${page}`);
  response(data, req, res, date);
};

mainCtrl.peliculasEstrenos = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/estrenos${page}`);
  response(data, req, res, date);
};

mainCtrl.peliculasPopulares = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/populares${page}`);
  response(data, req, res, date);
};

mainCtrl.getInfoPelicula = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  response(data, req, res, date);
};

mainCtrl.repPeliculas = async (req, res) => {
  const date = getDate();
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data);
    }
  }
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  response(data, req, res, date);
};

module.exports = mainCtrl;
