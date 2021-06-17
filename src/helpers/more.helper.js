const cheerio = require('cheerio');
const axios = require('axios');

async function fetchurl(param) {
  let url = param == null ? "" : param;
  try {
      const res = await axios.get(`https://pelisplushd.net/${url}`);
      return res.data;
  } catch (error) {
      console.error(error.data);
      return error.response.status;
  }
}

async function searchPoster (uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404
    }
    const $ = cheerio.load(html);
      
    let array = [];
      
    $('.Posters-link').each((i,el) => {
      const data = {
        i,
        poster_link: $(el)
          .attr('href')
          .replace(/\w{5}\W{3}(\w+\W){2}/gi, ''),
        poster: $(el).find('img')
          .removeAttr('class')
          .removeAttr('srcset')
          .removeAttr('data-srcset')
          .attr(),
        title: $(el).find('p').text(),
        raiting: $(el).find('.rating').text(),
        type: $(el).find('.centrado').text()
      };
      array.push(data);
    });

    array = array.filter(function(data) {
      return data.type !== ' Anime\n'; 
    });

    const page = parseInt($('.page-item.active .page-link').text());
    const lastPage = parseInt($('.page-item .page-link').eq(-2).text());

    const pagination =  {
      page,
      nextPage: page === lastPage ? null : page + 1,
      prevPage: page == 1 ? null : page - 1,
      lastPage,
    };

    return {
      posters: array,
      pagination
    };

  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reqGenders(uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404;
    }
    const $ = cheerio.load(html);
     
    const array = []
    $('.nav-item .dropdown-menu').eq(3).find('a').each((i, el) => {
      const $el = $(el);
      const object = {
        name: $el.text(),
        href: $el.attr('href')
      };
      array.push(object);
    });

    return array;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  searchPoster,
  reqGenders
}