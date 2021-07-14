const {
    getPosters,
    getInfo,
    reqSeasons,
    reqRepro
} = require('../helpers/all.helper')
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

mainCtrl.renderSeries = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/series${page}`);
  response(data, req, res);
}

mainCtrl.seriesEstrenos = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/series/estrenos${page}`);
  response(data, req, res);
}

mainCtrl.seriesPopulares = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/series/populares${page}`);
  response(data, req, res);
}

mainCtrl.getInfoSerie = async (req, res) => {
  const data = await getInfo(`/serie/${req.params.serie}`);
  response(data, req, res);
}

mainCtrl.reqSeasons = async (req, res) => {
  const data = await reqSeasons(`/serie/${req.params.serie}`);
  response(data, req, res);
}

mainCtrl.repSeries = async (req, res) => {
  const data = await reqRepro(`/serie/${req.params.serie}/temporada/${req.params.temp}/capitulo/${req.params.cap}`);
  response(data, req, res);
}

module.exports = mainCtrl