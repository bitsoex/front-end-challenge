# Bitso Front End Challenge

> Por César Guadarrama Cantú

### Requerimientos

* **Node** 8.11
* **NPM** 5.6
* **Webpack** 4.8
* **pm2** 2.10.3 _(Requerido para development)_

## Correr el proyecto

Primero, instalar dependencias.

```
npm install # ó yarn
```

Una vez que se hayan instalado las dependencias, escoger un modo para correr el proyecto:

#### Desarrollo

La aplicación esperará peticiones en el puerto 8080, para visualizar el app ir a `http://localhost:8080`

```
yarn start
```

El proyecto usa a pm2 para crear un servidor, se hace uso de webpack con _hot reload_ para actualización en tiempo real de componentes.

#### Producción

El bundle será almacenado en `dist`; se crearán diferentes _chunks_ los cuales serán requeridos por la aplicación de manera dinámica.

```
yarn build:prod
```

## Tecnologías

React, LESS, Redux, CSS3

#### Otras

Babel
Webpack
CanvasJS
Immutable

## Características

Entry bundle con un tamaño de 211Kb
