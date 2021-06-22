const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.set('port', process.env.PORT || 3000);

app.set(express.json());
app.set(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(cors());

app.use(require('./routes/main.routes'));
app.use(require('./routes/peliculas.routes'));
app.use(require('./routes/series.routes'));
app.use(require('./routes/animes.routes'));

module.exports = app;