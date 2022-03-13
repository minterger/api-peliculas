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

mainCtrl.renderSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series${page}`);
  response(data, req, res);
};

mainCtrl.seriesEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/estrenos${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.seriesPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/series/populares${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/series/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoSerie = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await getInfo(`/serie/${req.params.serie}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await getInfo(`/serie/${req.params.serie}`);
  response(data, req, res);
};

mainCtrl.reqSeasons = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqSeasons(`/serie/${req.params.serie}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqSeasons(`/serie/${req.params.serie}`);
  response(data, req, res);
};

mainCtrl.repSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqRepro(
      `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqRepro(
    `/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`
  );
  response(data, req, res);
};

module.exports = mainCtrl;
