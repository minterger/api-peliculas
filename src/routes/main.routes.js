const { Router } = require('express');
const router = Router();

const {
  search,
  generos,
  getGeneros,
  getGenerosPeliculas,
  getGenerosSeries,
  getGenerosAnimes
} = require('../controllers/more.controller')

router.get('/search', search);

router.get('/generos', generos);

router.get('/generos/:genero', getGeneros);

router.get('/generos/:genero/peliculas', getGenerosPeliculas);

router.get('/generos/:genero/series', getGenerosSeries);

router.get('/generos/:genero/animes', getGenerosAnimes);

module.exports = router;