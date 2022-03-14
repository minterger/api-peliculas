const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.renderPeliculas = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.peliculasEstrenos = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/estrenos${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.peliculasPopulares = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/populares${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getInfoPelicula = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.repPeliculas = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  await saveOnRedis(req, res, reply, data);
};

module.exports = mainCtrl;
