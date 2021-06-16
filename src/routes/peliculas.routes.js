const { Router } = require('express');
const router = Router();

const {
    renderPeliculas,
    peliculasEstrenos,
    peliculasPopulares,
    getInfoPelicula,
    repPeliculas,
} = require('../controllers/peliculas.controller');


router.get('/peliculas', renderPeliculas);

router.get('/peliculas/estrenos', peliculasEstrenos);

router.get('/peliculas/populares', peliculasPopulares);

router.get('/pelicula/:pelicula', getInfoPelicula);

router.get('/pelicula/rep/:pelicula', repPeliculas);

module.exports = router;