const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears,
  reqLastUploaded,
} = require("../helpers/more.helper");
const { redisGet, redisSet } = require("../redis");
const { compareDate, getDate } = require("../helpers/dates");
const response = require("../helpers/response");

const mainCtrl = {};

mainCtrl.search = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  //reemplazar ñ
  let search = req.query.s ? req.query.s.replace(/ñ/g, "%C3%B1") : "";
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `&page=${req.query.page}` : "";
    const data = await searchPoster(`/search?s=${search}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `&page=${req.query.page}` : "";
  const data = await searchPoster(`/search?s=${search}${page}`);
  response(data, req, res);
};

mainCtrl.getEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  response(data, req, res);
};

mainCtrl.generos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqGenders("");
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqGenders("");
  response(data, req, res);
};

mainCtrl.getGeneros = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/generos/${req.params.genero}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  response(data, req, res);
};

mainCtrl.getGenerosPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/peliculas${page}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/peliculas${page}`
  );
  response(data, req, res);
};

mainCtrl.getGenerosSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/series${page}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/series${page}`
  );
  response(data, req, res);
};

mainCtrl.getGenerosAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/animes${page}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/animes${page}`
  );
  response(data, req, res);
};

mainCtrl.years = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqYears("");
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqYears("");
  response(data, req, res);
};

mainCtrl.getYear = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  response(data, req, res);
};

mainCtrl.getYearPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/year/${req.params.year}/peliculas${page}`
    );
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  response(data, req, res);
};

mainCtrl.getYearSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}/series${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  response(data, req, res);
};

mainCtrl.getYearAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  response(data, req, res);
};

mainCtrl.getPais = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/pais/${req.params.pais}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  response(data, req, res);
};

mainCtrl.getActor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/actor/${req.params.actor}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  response(data, req, res);
};

mainCtrl.getDirector = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/director/${req.params.director}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  response(data, req, res);
};

mainCtrl.getEscritor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  response(data, req, res);
};

mainCtrl.getLastUploaded = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply && compareDate(reply.date)) {
    res.json(reply.data);
    const data = await reqLastUploaded();
    if (data.status) return;
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    return;
  }
  const data = await reqLastUploaded();
  response(data, req, res);
};

module.exports = mainCtrl;
