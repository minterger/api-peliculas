const { Router } = require('express');
const router = Router();

const {
  search,
  generos,
  getGeneros,
  getGenerosPeliculas,
  getGenerosSeries
} = require('../controllers/more.controller')

router.get('/search', search);

router.get('/generos', generos);

router.get('/generos/:genero', getGeneros);

router.get('/generos/:genero/peliculas', getGenerosPeliculas);

router.get('/generos/:genero/series', getGenerosSeries);

module.exports = router;