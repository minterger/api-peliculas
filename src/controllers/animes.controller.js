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

mainCtrl.renderAnimes = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/animes${page}`);
  response(data, req, req, res);
}

mainCtrl.animesEstrenos = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/animes/estrenos${page}`);
  response(data, req, res);
}

mainCtrl.animesPopulares = async (req, res) => {
  const page = req.query.page ? `?page=${req.query.page}` : '';
  const data = await getPosters(`/animes/populares${page}`);
  response(data, req, res);
}

mainCtrl.getInfoAnime = async (req, res) => {
  const data = await getInfo(`/anime/${req.params.anime}`);
  response(data, req, res);
}

mainCtrl.reqSeasons = async (req, res) => {
  const data = await reqSeasons(`/anime/${req.params.anime}`);
  response(data, req, res);
}

mainCtrl.repAnime = async (req, res) => {
  const data = await reqRepro(`/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`);
  response(data, req, res);
}

module.exports = mainCtrl