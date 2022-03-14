const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.renderSeries = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.seriesEstrenos = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/estrenos${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.seriesPopulares = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/populares${page}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.getInfoSerie = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await getInfo(`/serie/${req.params.serie}`);
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
    const data = await reqSeasons(`/serie/${req.params.serie}`);
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

mainCtrl.repSeries = async (req, res) => {
  try {
    const reply = await getForRedis(req, res);
    const data = await reqRepro(
      `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    await saveOnRedis(req, res, reply, data);
  } catch (error) {
    res.status(500).json({
      text: "Error al obtener los datos de la API",
    });
  }
};

module.exports = mainCtrl;
