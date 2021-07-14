const {
  getPosters,
  getInfo,
  reqRepro
} = require('../helpers/all.helper');
const mainCtrl = {};

function response(data, req, res) {
  if (data.status) {
    res.status(data.status)
    res.json({text: data.statusText + '. Vea la documentacion en: ' + req.get('host')});
  } else {
    res.status(200);
    res.json(data);
  }
}

mainCtrl.renderPeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas${page}`);
  response(data, req, res);
}

mainCtrl.peliculasEstrenos = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas/estrenos${page}`);
  response(data, req, res);
}

mainCtrl.peliculasPopulares = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/peliculas/populares${page}`);
  response(data, req, res);
}

mainCtrl.getInfoPelicula = async (req, res) => {
  const data = await getInfo(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
}

mainCtrl.repPeliculas = async (req, res) => {
  const data = await reqRepro(`/pelicula/${req.params.pelicula}`);
  response(data, req, res);
}

module.exports = mainCtrl;