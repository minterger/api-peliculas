const cheerio = require('cheerio');
const fetchurl = require('./url/fetch')

async function searchPoster (uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
      
    let array = [];
      
    $('.Posters-link').each((i,el) => {
      const data = {
        i,
        poster_link: $(el)
          .attr('href')
          .replace(/\w{4,5}\W{3}(\w+\.?){1,3}/gi, ''),
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

    // array = array.filter(function(data) {
    //   return data.type !== ' Anime\n'; 
    // });

    const page = parseInt($('.page-item.active .page-link').text());
    const lastPage = parseInt($('.page-item .page-link').eq(-2).text());

    const pagination =  {
      page,
      nextPage: page === lastPage ? null : page + 1,
      prevPage: page === 1 ? null : page - 1,
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

async function reqEstrenos(uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);

    const href = $('.nav-item .dropdown-menu').eq(4).find('a').attr('href')
    
    return await searchPoster(href);

  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reqGenders(uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
      
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

async function reqYears(uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
      
    const array = []
    $('.nav-item .dropdown-menu').eq(4).find('a').each((i, el) => {
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
  reqEstrenos,
  reqGenders,
  reqYears
}