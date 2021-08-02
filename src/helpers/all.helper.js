const cheerio = require('cheerio');
const fetchurl = require('./url/fetch')

async function getPosters (uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
      
    const array = [];
      
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
        raiting: $(el).find('.rating').text()
      };
      array.push(data);
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

async function getInfo(uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
    
    const object = {};
    object.title = $('.m-b-5').html().replace(/^\W/g, '');
    object.poster_img = $('.img-fluid.d-block.mx-auto.m-b-30').attr('src');
    object.descripcion = $('.text-large').html().replace(/^\W/g, '');
    object.raiting = $('.font-size-18.text-info.text-semibold.ion-md-star').text().replace(/^\W/g, '')
    object.ano = {
      text: $('.font-size-18.text-info.text-semibold').html().trim(),
      href: $('.p-v-20.p-r-15.text-center').find('a').attr('href').replace(/\w{4,5}\W{3}(\w+\.?){1,3}/gi, ''),
      title: $('.p-v-20.p-r-15.text-center').find('a').attr('title')
    }
    object.data = [];
    object.generos = [];
    $('.sectionDetail.mb15').each((i, el) => {
      const $el = cheerio.load($(el).html());
      const data = {};
      data.name = $el('span').html();
      data.content = [];
      let fecha = $(el).text().match(/\d+\W\w+?\W\d+/g)
      if ($el('a').html()) {
        $el('a').each((i, el) => {
          const content = {
            title: $(el).attr('title'),
            href: $(el).attr('href').replace(/\w{4,5}\W{3}(\w+\.?){1,3}/gi, ''),
            text: $(el).text()
          };
          data.content.push(content);
        });
      } else if (fecha !== null) {
        data.content.push({fecha: fecha[0]});
      }
      object.data.push(data);
    });
    $('.container-fluid .card .card-body .p-v-20').eq(1).find('a').each((i , el) =>{
      const $el = $(el);
      const genero = { 
        name: $el.find('span').text(),
        href: $el.attr('href'),
        title: $el.attr('title')
      }
      object.generos.push(genero);
    });
  
    return object;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reqSeasons(uri) {
  try {
    const html = await fetchurl(uri);
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
      
    const data = {};

    data.seasons = $('.TbVideoNv.nav.nav-tabs .nav-link').length;
    
    data.chapters = [];

    $('.tab-pane.fade.in').each((i,el) => {
      const chapters = [];
      const $el = cheerio.load($(el).html());
      $el('.btn.btn-primary.btn-block').each((i, el) => {
        chapters.push({
          title: $(el).text(),
          href: $(el).attr('href').replace(/\w{4,5}\W{3}(\w+\.?){1,3}/gi, '')
        });
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
    if (html.status !== 200) {
      return {
        status: html.status,
        statusText: html.statusText
      }
    }
    const $ = cheerio.load(html.data);
    const data = {};
    if ($('.btn.btn.btn-primary.btn-block').length) {
      data.navegacion = []
      $('.btn.btn.btn-primary.btn-block').each((i, el) => {
        data.navegacion.push({
          text: $(el).text(),
          href: $(el).attr('href').replace(/\w{4,5}\W{3}(\w+\.?){1,3}/gi, '')
        })
      })
    }
    data.reproductores = $('.player script').html()
      .match(/(https?:\/\/)[/a-z.0-9A-Z\-?=#%&]+/g);

    return data;
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