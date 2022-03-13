const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");
const { compareDate, getDate } = require("../helpers/dates");
const response = require("../helpers/response");

const mainCtrl = {};

mainCtrl.renderAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes${page}`);
  response(data, req, res);
};

mainCtrl.animesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/estrenos${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.animesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/animes/populares${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/animes/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await getInfo(`/anime/${req.params.anime}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await getInfo(`/anime/${req.params.anime}`);
  response(data, req, res);
};

mainCtrl.reqSeasons = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqSeasons(`/anime/${req.params.anime}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqSeasons(`/anime/${req.params.anime}`);
  response(data, req, res);
};

mainCtrl.repAnime = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqRepro(
      `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqRepro(
    `/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res);
};

module.exports = mainCtrl;
