var express = require('express');
var fs = require('fs');
var Db = require("./config/initializers/database.js")
var passport = require('passport');
var secrets = require('./config/secrets');
var webpack = require('webpack');
var config = require('../webpack/webpack.config.dev.js');
var app = express();
var compiler = webpack(config);

Db.initialisation();

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(app.get('port'));
