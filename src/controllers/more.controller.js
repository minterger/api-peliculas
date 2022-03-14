const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears,
  reqLastUploaded,
} = require("../helpers/more.helper");
const { getForRedis, saveOnRedis } = require("../helpers/redis");

const mainCtrl = {};

mainCtrl.search = async (req, res) => {
  const reply = await getForRedis(req, res);
  const search = req.query.s || "";
  const page = req.query.page ? `&page=${req.query.page}` : "";
  const data = await searchPoster(`/search?s=${search}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getEstrenos = async (req, res) => {
  const reply = await getForRedis(req, res);
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.generos = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqGenders("");
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getGeneros = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getGenerosPeliculas = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/peliculas${page}`
  );
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getGenerosSeries = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/series${page}`
  );
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getGenerosAnimes = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/animes${page}`
  );
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.years = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqYears("");
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getYear = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getYearPeliculas = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getYearSeries = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getYearAnimes = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getPais = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getActor = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getDirector = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getEscritor = async (req, res) => {
  const reply = await getForRedis(req, res);
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  await saveOnRedis(req, res, reply, data);
};

mainCtrl.getLastUploaded = async (req, res) => {
  const reply = await getForRedis(req, res);
  const data = await reqLastUploaded();
  await saveOnRedis(req, res, reply, data);
};

module.exports = mainCtrl;
