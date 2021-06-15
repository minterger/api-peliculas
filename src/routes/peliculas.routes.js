const { Router } = require('express');
const router = Router();

const {
    renderpeliculas,
    getInfoPelicula,
    repPeliculas,
} = require('../controllers/peliculas.controller');


router.get('/peliculas', renderpeliculas);

router.get('/pelicula/:pelicula', getInfoPelicula);

router.get('/pelicula/rep/:pelicula', repPeliculas);

module.exports = router;