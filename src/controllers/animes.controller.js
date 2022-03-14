const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.renderAnimes = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.animesEstrenos = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/estrenos${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.animesPopulares = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/populares${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.getInfoAnime = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await getInfo(`/anime/${req.params.anime}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.reqSeasons = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await reqSeasons(`/anime/${req.params.anime}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.repAnime = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await reqRepro(
      `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

module.exports = mainCtrl;
