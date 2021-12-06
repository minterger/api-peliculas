const { getPosters, getInfo, reqRepro } = require("../helpers/all.helper");
const { redisGet, redisSet } = require("../redis");
const mainCtrl = {};

// funcion para generar fecha actual
const getDate = () => {
  const date = new Date();
  return date;
};

// comparar si la fecha es mayor por 3 dias
const compareDate = (date) => {
  const dateNow = new Date();
  const diff = dateNow - date;
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

mainCtrl.renderPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && !compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas${page}`);
  response(data, req, res);
};

mainCtrl.peliculasEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && !compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/estrenos${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/estrenos${page}`);
  response(data, req, res);
};

mainCtrl.peliculasPopulares = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && !compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await getPosters(`/peliculas/populares${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await getPosters(`/peliculas/populares${page}`);
  response(data, req, res);
};

mainCtrl.getInfoPelicula = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && !compareDate(reply.date)) {
    res.json(reply.data);
    const data = await getInfo(`/pelicula/${req.params.pelicula}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
};

mainCtrl.repPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && !compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
};

module.exports = mainCtrl;
