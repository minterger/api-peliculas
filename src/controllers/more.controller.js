const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears,
  reqLastUploaded,
} = require("../helpers/more.helper");
const { redisGet, redisSet } = require("../redis");
const mainCtrl = {};

const getDate = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${day}/${month}/${year}`;
};

const response = async (data, req, res, date) => {
  if (data.status) {
    res.status(data.status);
    res.json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
  } else {
    res.status(200);
    await redisSet(req.originalUrl, JSON.stringify({ data, date }));
    res.json(data);
  }
};

mainCtrl.search = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `&page=${req.query.page}` : "";
  const data = await searchPoster(`/search?s=${req.query.s}${page}`);
  response(data, req, res, date);
};

mainCtrl.getEstrenos = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  response(data, req, res, date);
};

mainCtrl.generos = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await reqGenders("");
  response(data, req, res, date);
};

mainCtrl.getGeneros = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  response(data, req, res, date);
};

mainCtrl.getGenerosPeliculas = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/peliculas${page}`
  );
  response(data, req, res, date);
};

mainCtrl.getGenerosSeries = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/series${page}`
  );
  response(data, req, res, date);
};

mainCtrl.getGenerosAnimes = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/animes${page}`
  );
  response(data, req, res, date);
};

mainCtrl.years = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await reqYears("");
  response(data, req, res, date);
};

mainCtrl.getYear = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  response(data, req, res, date);
};

mainCtrl.getYearPeliculas = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  response(data, req, res, date);
};

mainCtrl.getYearSeries = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  response(data, req, res, date);
};

mainCtrl.getYearAnimes = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  response(data, req, res, date);
};

mainCtrl.getPais = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  response(data, req, res, date);
};

mainCtrl.getActor = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  response(data, req, res, date);
};

mainCtrl.getDirector = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  response(data, req, res, date);
};

mainCtrl.getEscritor = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  response(data, req, res, date);
};

mainCtrl.getLastUploaded = async (req, res) => {
  const date = getDate()
  let reply = await redisGet(req.originalUrl)
  reply = JSON.parse(reply)
  if (reply) {
    if (reply.date == date) {
      return res.json(reply.data)
    }
  }
  const data = await reqLastUploaded();
  response(data, req, res, date);
};

module.exports = mainCtrl;
