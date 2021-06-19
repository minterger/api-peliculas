const {
  getPosters,
  getInfo,
  reqRepro
} = require('../helpers/all.helper');
const mainCtrl = {};

mainCtrl.renderPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.peliculasEstrenos = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas/estrenos${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.peliculasPopulares = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas/populares${page}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.getInfoPelicula = async (req, res) => {
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.repPeliculas = async (req, res) => {
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  if (data.status) {
    res.status(data.status).send(data.statusText);
  } else {
    res.status(200);
    res.json(data);
  }
}

module.exports = mainCtrl;