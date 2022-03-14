const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.renderSeries = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.seriesEstrenos = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/estrenos${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.seriesPopulares = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/populares${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getInfoSerie = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await getInfo(`/serie/${req.params.serie}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.reqSeasons = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqSeasons(`/serie/${req.params.serie}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.repSeries = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqRepro(
    `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  await saveOnRedis(req, res, reply, data);
};

module.exports = mainCtrl;
