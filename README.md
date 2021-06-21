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

## Peticiones

Para moverse por las paginas usa ?page='num' 

- Series

  - /series
  - /series/estrenos
  - /series/populares
  - /serie/:serie
  - /serie/temporadas/:serie
  - /serie/:serie/temporada/:temp/capitulo/:cap

- Peliculas

  - /peliculas
  - /peliculas/estrenos
  - /peliculas/populares
  - /pelicula/:pelicula
  - /pelicula/rep/:pelicula

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