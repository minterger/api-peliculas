const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");

const mainCtrl = {};

mainCtrl.renderPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas${page}`);
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

mainCtrl.peliculasEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/estrenos${page}`);
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

mainCtrl.peliculasPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/populares${page}`);
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

mainCtrl.getInfoPelicula = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
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

mainCtrl.repPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
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

module.exports = mainCtrl;
