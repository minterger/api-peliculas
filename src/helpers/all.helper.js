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

async function getPosters (uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404
    }
    const $ = cheerio.load(html);
      
    const array = [];
      
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
        raiting: $(el).find('.rating').text()
      };
      array.push(data);
    });
    return array;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getInfo(uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404
    }
    const $ = cheerio.load(html);
    
    const object = {};
    object.title = $('.m-b-5').html().replace(/^\W/g, '');
    object.descripcion = $('.text-large').html().replace(/^\W/g, '');
    object.ano = $('.font-size-18.text-info.text-semibold').html().trim();
    object.data = [];
    $('.sectionDetail.mb15').each((i, el) => {
      const $el = cheerio.load($(el).html());
      const data = {};
      data.name = $el('span').html();
      data.content = [];
      if ($el('a').html()) {
        $el('a').each((i, el) => {
          const content = {
            title: $(el).attr('title'),
            href: $(el).attr('href').replace(/\w{5}\W{3}(\w+\W){2}/gi, ''),
            text: $(el).text()
          };
          data.content.push(content);
        });
      } else {
        data.content = $(el).text().match(/\d+\W\w+?\W\d+/g);
      }
      object.data.push(data);
    })
    return {object, $};
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reqSeasons(uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404
    }
    const $ = cheerio.load(html);
      
    const data = {};

    data.seasons = $('.TbVideoNv.nav.nav-tabs .nav-link').length;
    
    data.chapters = [];

    $('.tab-pane.fade.in').each((i,el) => {
      const chapters = [];
      const $el = cheerio.load($(el).html());
      $el('.btn.btn-primary.btn-block').each((i, el) => {
         chapters.push($(el).text());
      })
      data.chapters.push(chapters);
    })
    return data;

  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reqRepro (uri) {
  try {
    const html = await fetchurl(uri);
    if (parseInt(html) === 404) {
      return 404
    }
    const $ = cheerio.load(html);
    
    const video = $('.player script').html()
      .match(/(https?:\/\/)[/a-z.0-9A-Z\-?=#%&]+/g);

    return video;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  fetchurl,
  getPosters,
  getInfo,
  reqSeasons,
  reqRepro
};