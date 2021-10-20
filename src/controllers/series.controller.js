const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
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

mainCtrl.renderSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series${page}`);
  response(data, req, res);
};

mainCtrl.seriesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    await redisSet(req.originalUrl, JSON.stringify(data));
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/estrenos${page}`);
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.seriesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/populares${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoSerie = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await getInfo(`/serie/${req.params.serie}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await getInfo(`/serie/${req.params.serie}`);
  response(data, req, res);
};

mainCtrl.reqSeasons = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqSeasons(`/serie/${req.params.serie}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqSeasons(`/serie/${req.params.serie}`);
  response(data, req, res);
};

mainCtrl.repSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqRepro(
      `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqRepro(
    `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res);
};

module.exports = mainCtrl;
