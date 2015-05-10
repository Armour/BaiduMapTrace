// Generated by CoffeeScript 1.4.0
(function() {
  var bodyParser, compress, cookieParser, express, favicon, glob, logger, methodOverride;

  express = require('express');

  glob = require('glob');

  favicon = require('serve-favicon');

  logger = require('morgan');

  cookieParser = require('cookie-parser');

  bodyParser = require('body-parser');

  compress = require('compression');

  methodOverride = require('method-override');

  module.exports = function(app, config) {
    var controllers, env;
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');
    env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express["static"](config.root + '/public'));
    app.use(methodOverride());
    controllers = glob.sync(config.root + '/app/controllers/**/*.coffee');
    controllers.forEach(function(controller) {
      return require(controller)(app);
    });
    app.use(function(req, res, next) {
      var err;
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    });
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        return res.render('error', {
          message: err.message,
          error: err,
          title: 'error'
        });
      });
    }
    return app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      return res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
    });
  };

}).call(this);