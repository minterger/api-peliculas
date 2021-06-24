const mainCtrl = {};
const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears
} = require('../helpers/more.helper');

mainCtrl.search = async (req, res) => {
  const page = req.query.page ? `&page=${req.query.page}` : '';
  const data = await searchPoster(`/search?s=${req.query.s}${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getEstrenos = async (req, res) => {
  const data = await reqEstrenos('');
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.generos = async (req, res) => {
  const data = await reqGenders('');
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getGeneros = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getGenerosPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/peliculas${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getGenerosSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/series${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getGenerosAnimes = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/generos/${req.params.genero}/animes${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.years = async (req, res) => {
  const data = await reqYears('');
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getYear = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getYearPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getYearSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getYearAnimes = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

module.exports = mainCtrl;