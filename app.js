var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');

/*
* All available routes
 */
var routes  = require('./routes/index');
var search  = require('./routes/search');
var add     = require('./routes/add');
var apireq  = require('./routes/showAPI');
var update  = require('./routes/update');
var remove  = require('./routes/remove');

/*
* Global MongoDB connection
 */
var db = require('./db/connection');


var app = express();

// set environment (if empty development is used)
app.set('env', 'production');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit : '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* Routes usages - This binds the URL (http://localhost/URL) to the defined routes
* @see above
 */
app.use('/', routes);
app.use("/showAPI", apireq);
app.use('/search', search);
app.use('/add', add);
app.use('/update', update);
app.use('/remove', remove);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', {
     requestedURL : req.baseUrl
  });
});

// prettifies the HTML produced by jade even in development mode.
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

// export and make app usable in the whole application
module.exports = app;
