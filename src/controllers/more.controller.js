const mainCtrl = {};
const {
  searchPoster,
  reqGenders
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


module.exports = mainCtrl;