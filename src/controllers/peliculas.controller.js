const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");
const mainCtrl = {};

const response = async (data, req, res) => {
  if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
  } else {
    await redisSet(req.originalUrl, JSON.stringify(data));
    res.json(data);
  }
};

mainCtrl.renderPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas${page}`);
    if (!data.status) {
      await redisSet(req.originalUrl, JSON.stringify(data));
    }
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas${page}`);
  response(data, req, res);
};

mainCtrl.peliculasEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/estrenos${page}`);
    if (!data.status) {
      await redisSet(req.originalUrl, JSON.stringify(data));
    }
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.peliculasPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/populares${page}`);
    if (!data.status) {
      await redisSet(req.originalUrl, JSON.stringify(data));
    }
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoPelicula = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await getInfo(`/pelicula/${req.params.pelicula}`);
    if (!data.status) {
      await redisSet(req.originalUrl, JSON.stringify(data));
    }
    return;
  }
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
};

mainCtrl.repPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
    if (!data.status) {
      await redisSet(req.originalUrl, JSON.stringify(data));
    }
    return;
  }
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
};

module.exports = mainCtrl;
