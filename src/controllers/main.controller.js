const mainCtrl = {};
const {
  searchPoster,
  reqGenders
} = require('../helpers/main.helper');

mainCtrl.search = async (req, res) => {
  const page = req.query.page ? `&page=${req.query.page}` : '';
  const data = await searchPoster(`search?s=${req.query.s}${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.getGeneros = async (req, res) => {
  const page = req.query.page ? `&page=${req.query.page}` : '';
  const data = await searchPoster(`generos/${req.params.genero}${page}`);
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

mainCtrl.generos = async (req, res) => {
  const data = await reqGenders('');
  res.status(200)
  if (parseInt(data) === 404) {
    res.send('404', 'Not Found')
  } else {
    res.json(data);
  }
}

module.exports = mainCtrl;