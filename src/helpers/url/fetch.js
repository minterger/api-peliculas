const axios = require('axios');

async function fetchurl(param) {
  let uri = param == null ? "" : param;
  try {
    const res = await axios.get(`https://pelisplushd.net${uri}`);
    return res;
  } catch (error) {
    log
    if (error.response) return error.response;
    return {status: 500, statusText: 'error interno'}
  }
}

module.exports = fetchurl;