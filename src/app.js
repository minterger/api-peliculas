const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.set(express.json());
app.set(express.urlencoded({extended: false}));
app.use(morgan('dev'));

// cors support
app.use(cors());

// routes
app.use(require('./routes/main.routes'));
app.use(require('./routes/peliculas.routes'));
app.use(require('./routes/series.routes'));
app.use(require('./routes/animes.routes'));

// documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
  res.status(200);
});

// static files
app.use(express.static(path.join(__dirname, 'public')))

// others routes
app.get('*', (req, res) => {
  let url = req.get('host')
  res.json({text: 'Not Found. Vea la documentacion en: ' + url}).status(404);
})


module.exports = app;