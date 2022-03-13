const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");

const mainCtrl = {};

mainCtrl.renderAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes${page}`);
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

mainCtrl.animesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/estrenos${page}`);
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

mainCtrl.animesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/populares${page}`);
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

mainCtrl.getInfoAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await getInfo(`/anime/${req.params.anime}`);
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
  const data = await reqSeasons(`/anime/${req.params.anime}`);
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

mainCtrl.repAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqRepro(
    `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
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
