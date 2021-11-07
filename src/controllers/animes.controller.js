const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro,
} = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");
const mainCtrl = {};

// funcion para generar fecha actual
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

// comparar si la fecha es mayor por 3 dias
const compareDate = (date) => {
  const dateNow = new Date();
  const dateCompare = new Date(date);
  const diff = dateNow - dateCompare;
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diffDays > 3;
};

const response = async (data, req, res) => {
  if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
  } else {
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    res.json(data);
  }
};

mainCtrl.renderAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
  if (reply && !compareDate(reply.date)) {
    reply = JSON.parse(reply);
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
