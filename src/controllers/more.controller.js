const {
  searchPoster,
  reqEstrenos,
  reqGenders,
  reqYears,
  reqLastUploaded,
} = require("../helpers/more.helper");
const { redisGet, redisSet } = require("../redis");

const mainCtrl = {};

mainCtrl.search = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `&page=${req.query.page}` : "";
  const data = await searchPoster(`/search?s=${search}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getEstrenos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  // const data = await reqEstrenos('');
  const data = await searchPoster(`/year/${process.env.YEAR_ESTRENO}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.generos = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqGenders("");
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getGeneros = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/generos/${req.params.genero}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getGenerosPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/peliculas${page}`
  );
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getGenerosSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/series${page}`
  );
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getGenerosAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(
    `/generos/${req.params.genero}/animes${page}`
  );
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.years = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqYears("");
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getYear = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getYearPeliculas = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/peliculas${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getYearSeries = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/series${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getYearAnimes = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/year/${req.params.year}/animes${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getPais = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/pais/${req.params.pais}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getActor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/actor/${req.params.actor}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getDirector = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/director/${req.params.director}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getEscritor = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const page = req.query.page ? `?page=${req.query.page}` : "";
  const data = await searchPoster(`/escritor/${req.params.escritor}${page}`);
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

mainCtrl.getLastUploaded = async (req, res) => {
  let reply = await redisGet(req.originalUrl);
  reply = JSON.parse(reply);
  if (reply) {
    res.json(reply);
  }
  const data = await reqLastUploaded();
  if (!reply) {
    res.json(data);
  } else if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
    return;
  }
  await redisSet(req.originalUrl, JSON.stringify(data));
};

module.exports = mainCtrl;
