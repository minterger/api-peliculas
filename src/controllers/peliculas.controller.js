const {
    getPosters,
    getInfo,
    reqRepro
} = require('../helpers/all.helper');
const mainCtrl = {};

mainCtrl.renderpeliculas = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`peliculas${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.getInfoPelicula = async (req, res) => {
  const data = await getInfo(`pelicula/${req.params.pelicula}`);
    if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.repPeliculas = async (req, res) => {
  const data = await reqRepro(`pelicula/${req.params.pelicula}`);
    if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

module.exports = mainCtrl;