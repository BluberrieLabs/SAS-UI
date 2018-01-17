var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var index = require('./routes/index');
var logout = require('./routes/logout');
var login = require('./routes/login');
var reset = require('./routes/reset');
var thanks = require('./routes/thanks');
var manage = require('./routes/manage');
var email = require('./routes/email');
var messages = require('./routes/messages');
const fs = require('fs');
var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('config', config);

var cert = fs.readFileSync(config.api.publickey);

app.set('jwtcert', cert); //signing cert

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/js",express.static(__dirname + "/public/js"));
app.use("/images",express.static(__dirname + "/public/image"));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/reset', reset);
app.use('/thanks', thanks);
app.use('/manage', manage);
app.use('/manage/email', email);
app.use('/manage/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
