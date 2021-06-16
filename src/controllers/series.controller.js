const {
    getPosters,
    getInfo,
    reqSeasons,
    reqRepro
} = require('../helpers/all.helper')
const mainCtrl = {};

mainCtrl.renderSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`series${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.seriesEstrenos = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`series/estrenos${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.seriesPopulares = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`series/populares${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.getInfoSerie = async (req, res) => {
  const data = await getInfo(`serie/${req.params.serie}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.reqSeasons = async (req, res) => {
  const data = await reqSeasons(`serie/${req.params.serie}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.repSeries = async (req, res) => {
  const data = await reqRepro(`serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

module.exports = mainCtrl