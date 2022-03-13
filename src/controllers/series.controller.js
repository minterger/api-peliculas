const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");

const mainCtrl = {};

mainCtrl.renderSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series${page}`);
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

mainCtrl.seriesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/estrenos${page}`);
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

mainCtrl.seriesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/populares${page}`);
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

mainCtrl.getInfoSerie = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await getInfo(`/serie/${req.params.serie}`);
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

mainCtrl.reqSeasons = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqSeasons(`/serie/${req.params.serie}`);
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

mainCtrl.repSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqRepro(
    `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
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
