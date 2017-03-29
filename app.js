// Load environment variables
require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Boom = require('boom');
var Celebrate = require('celebrate');
var cors = require('cors');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const boom = Boom.notFound()
  next(boom);
});

// Catch validation errors
app.use(Celebrate.errors());

// General error handler
app.use(function(error, req, res, next) {
  if(!error.isBoom) {
    error = Boom.wrap(error, 500);
  }

  const status = error.output.statusCode;
  const payload = error.output.payload;
  res.status(status).send(payload);
});

module.exports = app;
