# BITSO FRONT END CHALLENGE

![Front End Challenge Image](https://github.com/bitsoex/front-end-challenge/blob/master/bann_bfec.jpg)

# Justificación y Estructura del Proyecto

## Tecnologías ocupadas:

1. neutrinojs
2. react
3. react-router
4. react-redux
5. react-stockcharts
6. postcss
7. standardjs
8. cypress

### [Neutrinojs](https://neutrinojs.org/)

Es un empaquetador web de fácil uso y configuración en comparación a webpack, soporta configuración de babel mediante el archivo .neutrino.js, de postcss y más. Lo use en el proyecto para poder enfocarme más en desarrollar la aplicación sin preocuparme demasiado en el la configuración del ambiente de desarrollo y de producción.

### [React router](https://reacttraining.com/react-router/)

Es un conjunto de componentes de react que proveen un entorno de navegación entre componentes mediante el [HISTORY API](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador), mejoran así la estructura del código y pudiendo reutilizar componentes entre rutas, usar URI PARAMS y QUERY PARAMS que hacen más potente nuestra aplicación.
Lo use en el proyecto porque la interfaz muestra dropdowns que pretender navegar entre otros dashboard, con react router la estrucutra del proyecto se mejora a un código más entendible.

### [React redux](https://redux.js.org/basics/usage-with-react)

Utilería que conecta react con redux. Redux es un gestor de estado global, debido a la naturaleza de react (hasta antes de context API) pasar datos de un componente padré a hijos y viceversa era demásiado complicado. Redux se hizo pensado para ser más génerico pero con react-redux podemos conectar nuestros componentes de react a un estado global reactivo, permitiendo así hacer componentes funcionales y manipular el estado de forma global; haciendo que la reactividad afecte a los componentes suscritos al `store`. Lo use en este proyecto debido a que se necesita conectar con un API, y gracias a redux thunk (middleware de redux) permite trabajar redux con funciones asíncronas. De esta forma se puede compartir un mismo store entre varios componentes que requieran los mismo datos.

### [React stockcharts](http://rrag.github.io/react-stockcharts/documentation.html)

Libreria de react para gráficos hecha con D3, svgs y canvas, comportandose de manera más eficiente que otras herramientas de gráficos que usan diferentes elementos HTML para generar las formas. La use en el proyecto debido a la complejidad de las gráficas de velas y area que se solicitan en el diseño.

### [Postcss](https://postcss.org/)

Es un procesador de css que permite importar los archivos css dentro del código javascript, lo use para poder hacer modular los estilos y mejorar la estrucura del proyecto.

### [Standardjs](https://standardjs.com/#usage)

Es una guía de código y analizador que permite crear código limpio y fácil de leer sin demasiadas configuración. Lo use en el proyecto para mantener un estilo en todo el proyecto con un diseño limpio y fácil en el código.

### [Cypress](https://www.cypress.io/)

Cypress es una herramienta de testing web. La agrego el proyecto para poder probar los componentes y las vistas.

## Estructura del proyecto:
La raíz del código se encuentra en la carpeta `src/` dentro del repositorio con las siguientes carpetas:

1. `components`
2. `constants`
3. `lib`
4. `router`
5. `store`
6. `views`
7. `index.js`

### components

Son componentes con funcionalidades básicas, el conjunto de componentes crean vistas (views) más complejas. Este directorio y sus archivos hacen el código más legible y reutilizable, el componente puede ser un archivo simple o una carpeta con un elemento index.js y un contenido más ámplio. Si tienes un componente que se puede reutilizar en varias vistas por favor metelo en esta carpeta.
(PLUS) Adicional se encuentra dentro una carpeta de UI con componentes especificos para esta función como ejemplo:['dropdowns', 'tablas', 'gráficas'].

### constants

Este directorio tiene datos duros que no cambiaran durante la ejecución y que se reutilizan durante todo el proyecto, puedes ingresar los datos dentro del elemento `index.js` o crear un nuevo archivo/carpeta, lo dejo a tu criterio.

### lib

Contiene archivos/directorios con código que cumplen una función en especifico, como ejemplo la lib para la API de bitso, convertir cadenas a números con formato de moneta, etc. Puedes agregar archivos/directorios que consideres tienen una función en específico.

### router

Aquí se encuentra la configuración de react-router, puedes agregar una configuración personalizada al archivo index.jsx, o si solo deseas agregar una nueva ruta puedes hacerlo desde el archivo routes.js. Para hacerlo solo importas el componente que deseas agregar al router y defines un nuevo elemento del arreglo basando en la estructura de muestra... ¡Y listo! ya puedes acceder a tu componente con la URL definida.

### store

En este directorio se encuentra la configuración de redux, redux se divide en tres partes:
1. El estado inicial
2. Los reductores que cambian el estado incial mediante acciones
3. Las acciones que detonan los reductores y le pasan parametros al reductor

Para agregar una nueva llave al objeto global solo tienes que agregar un nuevo archivo en la carpeta reducers, importarlo dentro del archivo index.js y agregarlo al objeto dentro de la `función combine reducers` en el mismo archivo. El `reducer` nuevo que creaste de tener tanto el estado inical como los reductores, solo debes seguir el patrón de los otros archivos.

Si deseas agregar una nueva acción puedes crear un archivo dentro de la carpeta actions y ahí solo escribes funciones javascript que hagan el dispatch de la acción. [ref](https://redux.js.org/basics/actions)

### views

Este directorio contiene los componentes que son apuntados por las rutas del react router, y son conformados por componentes base.

### index.js

Este archivo monta la aplicación dentro del DOM en el div con id 'root'


# Configuración del proyecto
Requisitos mínimos:
1. NPM 5.6
2. GIT
3. Deshabilitar la pólitica del CORS en el navegador o instalar una extensión que fácilite esto

## Obtener el repositorio:

$ git clone https://github.com/visomiDev/front-end-challenge && cd front-end-challenge

## Instalar las dependencias

$ npm install

## Correr el projecto en modo desarrollo

$ npm start

Ahora puedes ir a tu navegador y consultar la url: [http://127.0.0.1:1234](http://127.0.0.1:1234)

## Empaquetar el código para producción

$ npm run build

Copiar el código dentro de la carpeta `dist` en donde desees publicarlo.
