const { Router } = require('express');
const router = Router();

const {
  renderAnimes,
  animesEstrenos,
  animesPopulares,
  getInfoAnime,
  reqSeasons,
  repAnime
} = require('../controllers/animes.controller.js');

router.get('/animes', renderAnimes);

router.get('/animes/estrenos', animesEstrenos);

router.get('/animes/populares', animesPopulares);

router.get('/anime/:anime', getInfoAnime);

router.get('/anime/temporadas/:anime', reqSeasons);

router.get('/anime/:anime/temporada/:temp/capitulo/:cap', repAnime);

module.exports = router;