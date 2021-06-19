const axios = require('axios');

async function fetchurl(param) {
  let uri = param == null ? "" : param;
  try {
    const res = await axios.get(`https://pelisplushd.net${uri}`);
    return res;
  } catch (error) {
    console.error(`Error: ${error.response.status} ${error.response.statusText}`);
    return error.response;
  }
}

module.exports = fetchurl;