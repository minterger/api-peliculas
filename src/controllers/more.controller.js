const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears,
  reqLastUploaded,
} = require("../helpers/more.helper");
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

mainCtrl.search = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `&page=${req.query.page}` : "";
    const data = await searchPoster(`/search?s=${req.query.s}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `&page=${req.query.page}` : "";
  const data = await searchPoster(`/search?s=${req.query.s}${page}`);
  response(data, req, res);
};

mainCtrl.getEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  response(data, req, res);
};

mainCtrl.generos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqGenders("");
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqGenders("");
  response(data, req, res);
};

mainCtrl.getGeneros = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/generos/${req.params.genero}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  response(data, req, res);
};

mainCtrl.getGenerosPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/peliculas${page}`
    );
    await redisSet(req.originalUrl, JSON.stringify(data));
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
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/series${page}`
    );
    await redisSet(req.originalUrl, JSON.stringify(data));
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
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/generos/${req.params.genero}/animes${page}`
    );
    await redisSet(req.originalUrl, JSON.stringify(data));
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
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqYears("");
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqYears("");
  response(data, req, res);
};

mainCtrl.getYear = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  response(data, req, res);
};

mainCtrl.getYearPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(
      `/year/${req.params.year}/peliculas${page}`
    );
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  response(data, req, res);
};

mainCtrl.getYearSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}/series${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  response(data, req, res);
};

mainCtrl.getYearAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  response(data, req, res);
};

mainCtrl.getPais = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/pais/${req.params.pais}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  response(data, req, res);
};

mainCtrl.getActor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/actor/${req.params.actor}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  response(data, req, res);
};

mainCtrl.getDirector = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/director/${req.params.director}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  response(data, req, res);
};

mainCtrl.getEscritor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const page = req.query.page ? `?page=${req.query.page}` : "";
    const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  response(data, req, res);
};

mainCtrl.getLastUploaded = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  if (reply) {
    reply = JSON.parse(reply);
    res.json(reply);
    const data = await reqLastUploaded();
    await redisSet(req.originalUrl, JSON.stringify(data));
    return;
  }
  const data = await reqLastUploaded();
  response(data, req, res);
};

module.exports = mainCtrl;
