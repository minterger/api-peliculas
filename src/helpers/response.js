const response = async (data, req, res) => {
  if (data.status) {
    res.status(data.status).json({
      text: data.statusText + ". Vea la documentacion en: " + req.get("host"),
    });
  } else {
    await redisSet(req.originalUrl, JSON.stringify({ data, date: getDate() }));
    res.json(data);
  }
};

module.exports = response;