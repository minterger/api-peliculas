const { Router } = require('express');
const router = Router();

const {
  renderSeries,
  getInfoSerie,
  reqSeasons,
  repSeries
} = require('../controllers/series.controller.js');

router.get('/series', renderSeries);

router.get('/serie/:serie', getInfoSerie);

router.get('/serie/seasons/:serie', reqSeasons);

router.get('/serie/rep/:serie/season/:temp/chapter/:cap', repSeries);

module.exports = router;