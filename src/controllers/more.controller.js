const mainCtrl = {};
const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears
} = require('../helpers/more.helper');

function response(data, req, res) {
  if (data.status) {
    res.status(data.status)
    res.json({text: data.statusText + '. Vea la documentacion en: ' + req.get('host')});
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.search = async (req, res) => {
  const page = req.query.page ? `&page=${req.query.page}` : '';
  const data = await searchPoster(`/search?s=${req.query.s}${page}`);
  response(data, req, res);
}

mainCtrl.getEstrenos = async (req, res) => {
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  response(data, req, res);
}

mainCtrl.generos = async (req, res) => {
  const data = await reqGenders('');
  response(data, req, res);
}

mainCtrl.getGeneros = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  response(data, req, res);
}

mainCtrl.getGenerosPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/peliculas${page}`);
  response(data, req, res);
}

mainCtrl.getGenerosSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/series${page}`);
  response(data, req, res);
}

mainCtrl.getGenerosAnimes = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/animes${page}`);
  response(data, req, res);
}

mainCtrl.years = async (req, res) => {
  const data = await reqYears('');
  response(data, req, res);
}

mainCtrl.getYear = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  response(data, req, res);
}

mainCtrl.getYearPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  response(data, req, res);
}

mainCtrl.getYearSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  response(data, req, res);
}

mainCtrl.getYearAnimes = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  response(data, req, res);
}

mainCtrl.getPais = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  response(data, req, res);
}

mainCtrl.getActor = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  response(data, req, res);
}

mainCtrl.getDirector = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  response(data, req, res);
}

mainCtrl.getEscritor = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  response(data, req, res);
}

module.exports = mainCtrl;