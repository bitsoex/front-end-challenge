# Bitso Front End Challenge
This repo was built in order to participate in a challenge hosted by the largest cryptocurrency exchange in Mexico. (more info on the original repo from which this one was forked) :bitcoin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification, will output to /dist
npm run build

```

For a detailed explanation on how things work, check out the [starter template used](http://vuejs-templates.github.io/webpack/) and [docs for vue](http://vuejs.github.io/).

This repo uses an official Vue template that comes with state of the art tech like webpack, babel and eslint, amongst others. This saves you a lot of hard work of configuring build steps and also comes with Vue-loader, for hot reloading during development.

## Project Structure

This is based in common Vue.js structure, the most important parts are:

`/index.html` the place for setting up head things, meta, title, favicon

`/static` assets that we do not want to compile or that we need a non-js path to

`/src/assets` icons, images, fonts and other things that we want to be minified if possible.

`/src/components` the code, here resides all the html, css and most of the js, this is the structure of the components.

![Structure of components](/static/structure.png)

`/router/index.js` the routes for navigation

`/store/index.js` Vuex, for sharing data between components (if you come from a React background, here is Redux)

`App.vue` the main wrapper for the app, components that we will share in all the app, will be here

`main.js` configuration file for Vue

## Performance
>There is always chance for improvement. Always.

That being said...

• the full project is < 100KB in total size after build
> ~ 1/3 of the weight of google.com, a standard in fast websites

> check it by yourself, `npm run build` and head to `/dist`

• No external front end libraries like bootstrap or anything else.

• Not even a charting library, all was done purely with Vue and divs in order to achieve higher performance and go by the design 100%.

> no, it was just for fun but likely also helped performance :alien:

• cache is enabled at the max, if you reload the webpage, only api data reloads not components.

• uses specially low ram and cpu.

![ram and cpu usage](/static/ram.png)

#### • 100 / 100 pagespeed insights rating on mobile.
> 99 / 100 on desktop

![pagespeed insights](/static/pagespeed-insights.png)

## Extras

#### Day Mode

>Access to day mode with a tasteful animation, using the button at the top right corner.

![that feeling](/static/that-feeling.jpg)

#### Hosting

>This project is hosted on firebase and is on [https://bitso-challenge.com](https://bitso-challenge.com)

>Yes, it has https :rocket:

#### Dynamic page title
>Just as in [bitso.com](bitso.com), you can see the current price of your prefered cryptocurrency in the browser tab title, powered by websockets.

#### Save settings on localStorage
You prefer day mode? Switch to it and that setting will be saved, next time you visit, day mode will be the default.

> check it out, enable day mode and reload the page / open another tab or whatever you like.

> (localStorage its shared between the same website and on the same browser, won´t share between Chrome and Firefox or between localhost and bitso-challenge.com)

#### Deploy in one step
Running `npm run deploy` automatically makes the build for production and uploads it to firebase (both hosting and functions)

> need to be logged in on a firebase account with permissions for the project

#### Functions
> In order to be able to have the project online and do not ask the user to install a CORS plugin in their browser, some intermediate [google cloud] functions with CORS activated were made. You can check the code in `/functions/index.js`. They only make a request to [api.bitso.com](api.bitso.com), get the data and send them with `'Access-Control-Allow-Origin', *` header. Pretty simple, but could be useful for CPU heavy computations that we do not want to have in the front end.

## Responsiveness
Everything looks good in any device, from iPhone 3g to UltraWide 4k monitors, there are some special things in mobile, like the sounds on tab change :bell: be sure to check it out.

## Tests
The project automatically runs tests on `npm run deploy`, those are e2e tests, which automatically open a browser tab an asserts everything looks ok, depending on what it was configured.
You can check the code for those in `test/e2e/specs/test.js`
