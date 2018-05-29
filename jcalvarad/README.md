# Intro

Create a React webb app that fullfills the requirements described in https://github.com/bitsoex/front-end-challenge

[Deployed version here!](https://nostalgic-montalcini-99ffb4.netlify.com/)

The proposed stack for the mvp goes as follows:

* [x] Create React App to bootstrap app
* [x] React Toolbox as UI framework
* [x] MobX for state management
* [x] Highcharts
* [x] CSS Modules

## Getting started

Install all node dependencies: `npm install`

To run a development server: `npm start`

To make a production build: `npm run build`
After building the project you can oiptionally run it locally from your build folder with:

```
sudo npm install -g serve
cd ./build
serve
```

## UI components

* [x] Layout
* [x] Header Bar
* [x] Books Header
* [x] Trades
* [x] Buy
* [x] Sell
* [x] Chart

## Features

> Welcome changing requirements, even late in
> development. Agile processes harness change for
> the customer's competitive advantage.
> [Agile Manifeto Principles](http://agilemanifesto.org/principles.html)

This project's architecture was implemented with an agile develpment process in mind. This way the web application can be extensible and easily modified.
Some of the features implemented in this project:

### Decoupling presentational components

The components folder includes only presentational components, this means they don't process any information or have any business logic. This is an advantage as this components can be exported as an external module and reused for different projects or to port it to mobile/desktop (react native/electron).

### Use of container components

This components are the bridge between the stores that hold the application's state and the presentational components. They give a nice decoupling between UI and business logic.

### State management

Applications without a structured state management can get really messy very quickly. Mobx is used in this application for state management and we use a stores approach to structure the app's state containment and manipulation.

### Css modules

CSS3 was chosen along with CSS modules with a transpiler. This enables us to use the latest CSS features, and most importantly make modular style sheets where the scope is limited to a component or group of components avoiding style collisions.

### Modular testting

Testing is implemented per component for the UI part, and per store in the business logic to ensure high quality code and avoid regresseions.

### Linting and formatting

Eslinter and Prettier are configured in the project so the developer can find potential errors at coding time and also have a consistent format throught the project.

### Responsive

Mobile first aproach to responsive app.
