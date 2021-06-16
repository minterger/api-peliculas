const { Router } = require('express');
const router = Router();

const {
  search,
  getGeneros,
  generos
} = require('../controllers/main.controller')

router.get('/search', search);

router.get('/generos', generos);

router.get('/generos/:genero', getGeneros);

module.exports = router;