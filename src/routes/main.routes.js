const { Router } = require('express');
const router = Router();

const {
  search,
  getEstrenos,
  generos,
  getGeneros,
  getGenerosPeliculas,
  getGenerosSeries,
  getGenerosAnimes,
  years,
  getYear,
  getYearPeliculas,
  getYearSeries,
  getYearAnimes
} = require('../controllers/more.controller')

router.get('/search', search);

router.get('/estrenos', getEstrenos)

router.get('/generos', generos);

router.get('/generos/:genero', getGeneros);

router.get('/generos/:genero/peliculas', getGenerosPeliculas);

router.get('/generos/:genero/series', getGenerosSeries);

router.get('/generos/:genero/animes', getGenerosAnimes);

router.get('/years', years);

router.get('/year/:year', getYear);

router.get('/year/:year/peliculas', getYearPeliculas);

router.get('/year/:year/series', getYearSeries);

router.get('/year/:year/animes', getYearAnimes);

module.exports = router;