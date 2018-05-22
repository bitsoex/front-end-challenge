
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
    config = rewireMobX(config, env);
    config = rewireCssModules(config, env);
    return config;
  }