const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.renderPeliculas = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.peliculasEstrenos = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/estrenos${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.peliculasPopulares = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/populares${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.getInfoPelicula = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await getInfo(`/pelicula/${req.params.pelicula}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.repPeliculas = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

module.exports = mainCtrl;
