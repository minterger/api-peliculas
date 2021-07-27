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
  getYearAnimes,
  getPais,
  getActor,
  getDirector,
  getEscritor,
  getLastUploaded
} = require('../controllers/more.controller');

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

router.get('/pais/:pais', getPais);

router.get('/actor/:actor', getActor);

router.get('/director/:director', getDirector);

router.get('/escritor/:escritor', getEscritor);

router.get('/last', getLastUploaded);

module.exports = router;