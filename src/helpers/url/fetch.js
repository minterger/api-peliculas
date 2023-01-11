const axios = require("axios");

async function fetchurl(param) {
  let uri = param == null ? "" : param;
  try {
    const res = await axios.get(`https://www.pelisplus.lat${uri}`);
    return res;
  } catch (error) {
    if (error.response) return error.response;
    return { status: 500, statusText: "error interno" };
  }
}

module.exports = fetchurl;
