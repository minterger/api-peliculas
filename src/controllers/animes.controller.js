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

mainCtrl.renderAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes${page}`);
  response(data, req, res);
};

mainCtrl.animesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/estrenos${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.animesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/populares${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await getInfo(`/anime/${req.params.anime}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await getInfo(`/anime/${req.params.anime}`);
  response(data, req, res);
};

mainCtrl.reqSeasons = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqSeasons(`/anime/${req.params.anime}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqSeasons(`/anime/${req.params.anime}`);
  response(data, req, res);
};

mainCtrl.repAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqRepro(
      `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqRepro(
    `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res);
};

module.exports = mainCtrl;
