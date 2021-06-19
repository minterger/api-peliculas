const {
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro
} = require('../helpers/all.helper')
const mainCtrl = {};

mainCtrl.renderAnimes = async (req, res) => {
const page = req.query.page ? `?page=${req.query.page}` : '';
const data = await getPosters(`/animes${page}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

mainCtrl.animesEstrenos = async (req, res) => {
const page = req.query.page ? `?page=${req.query.page}` : '';
const data = await getPosters(`/animes/estrenos${page}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

mainCtrl.animesPopulares = async (req, res) => {
const page = req.query.page ? `?page=${req.query.page}` : '';
const data = await getPosters(`/animes/populares${page}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

mainCtrl.getInfoAnime = async (req, res) => {
const data = await getInfo(`/anime/${req.params.anime}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

mainCtrl.reqSeasons = async (req, res) => {
const data = await reqSeasons(`/anime/${req.params.anime}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

mainCtrl.repAnime = async (req, res) => {
const data = await reqRepro(`/anime/${req.params.anime}/temporada/${req.params.temp}/capitulo/${req.params.cap}`);
if (data.status) {
  res.status(data.status).send(data.statusText);
} else {
  res.status(200);
  res.json(data);
}
}

module.exports = mainCtrl