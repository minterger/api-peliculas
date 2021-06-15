const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port', 3000);

app.set(express.json());
app.set(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(require('./routes/main.routes'));
app.use(require('./routes/peliculas.routes'));
app.use(require('./routes/series.routes'));

module.exports = app;