const { Router } = require('express');
const router = Router();

const {
  renderSeries,
  seriesEstrenos,
  seriesPopulares,
  getInfoSerie,
  reqSeasons,
  repSeries
} = require('../controllers/series.controller.js');

router.get('/series', renderSeries);

router.get('/series/estrenos', seriesEstrenos);

router.get('/series/populares', seriesPopulares);

router.get('/serie/:serie', getInfoSerie);

router.get('/serie/seasons/:serie', reqSeasons);

router.get('/serie/:serie/temporada/:temp/capitulo/:cap', repSeries);

module.exports = router;