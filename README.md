# Api-Peliculas

## Instalar
```
npm install
```

## Iniciar en Producción
```
npm start
```

## Instalar dependecias de desarrollo
```
npm install -D
```

## Iniciar en Desarrollo
```
npm run dev
```

---

## Variables de Entorno

* YEAR_ESTRENO=año --> reemplace año por el año mas actual para traer las peliculas de estreno
* PORT=puerto --> reemplace puerto por el puerto que desea usar

---

## Peticiones

Para moverse por las paginas usa la query ?page='num' 

- Peliculas

  - /peliculas
  - /peliculas/estrenos
  - /peliculas/populares
  - /pelicula/:pelicula
  - /pelicula/rep/:pelicula

- Series

  - /series
  - /series/estrenos
  - /series/populares
  - /serie/:serie
  - /serie/temporadas/:serie
  - /serie/:serie/temporada/:temp/capitulo/:cap

- Animes

  - /animes
  - /animes/estrenos
  - /animes/populares
  - /anime/:anime
  - /anime/temporadas/:anime
  - /anime/:anime/temporada/:temp/capitulo/:cap

- Buscador

  - /search?s='busqueda'

- Generos

  - /generos
  - /generos/:genero
  - /generos/:genero/peliculas
  - /generos/:genero/series
  - /generos/:genero/animes

- Años

  - /years
  - /year/:year
  - /year/:year/peliculas
  - /year/:year/series
  - /year/:year/animes

- Estrenos Ultimo Año

  - /estrenos