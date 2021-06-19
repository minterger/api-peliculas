const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port', 3000);

app.set(express.json());
app.set(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(require('./routes/main.routes'));
app.use(require('./routes/peliculas.routes'));
app.use(require('./routes/series.routes'));
app.use(require('./routes/animes.routes'));

module.exports = app;