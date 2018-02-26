/*
Express is a routing and middleware web framework that has minimal functionality of its own:
An Express application is essentially a series of middleware function calls.

Routing refers to determining how an application responds to a client request to a particular endpoint,
which is a path and specific HTTP request method.
Each route can have one or more handler functions, which are executed when the route is matched.
 app.METHOD(PATH, HANDLER)
 -app is an instance of express.
 -METHOD is an HTTP request method, in lowercase.
 -PATH is a path on the server.
 -HANDLER is the function executed when the route is matched.
 */

// define routing using methods of the Express app object that correspond to HTTP methods.
var express = require('express');
// takes file from specified path and save it in variable var,const
var path = require('path');
// little icon in tab
var favicon = require('serve-favicon');
// logging errors and warnings
var logger = require('morgan');


/* Use third-party middleware to add functionality to Express apps.
 Loading the cookie-parsing middleware function cookie-parser.Parse cookie header and populate req.cookies */
var cookieParser = require('cookie-parser');
// Parse HTTP request body
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('./config.json').mongoDb;
var url = "mongodb://"+ mongoConfig.host + ":" + mongoConfig.port  + "/" + mongoConfig.database;

//Creates an Express application. The express() function is a top-level function exported by the express module
var app = express();

function initMongo() {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mongoConfig.database);

        dbo.createCollection(mongoConfig.collection, function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*The default engine extension to use when omitted.
  NOTE: Sub-apps will inherit the value of this setting. - view engine - set key-value -
 */
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

/*  use function -> The path for which the middleware function is invoked,and callback function
    Mounts the specified middleware function or functions at the specified path:
    the middleware function is executed when the base of the requested path matches path.
 */

app.use(logger('dev'));
// use bodyParser object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//use cookieParser object
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
initMongo();

// use api route(path) '/api'

app.use('/api', routes);
app.use('/', function (req, res) {
    res.render('index', {title : 'MOP Twitter clone'});

});
/*The application “listens” for requests that match the specified route(s) and method(s),
 and when it detects a match, it calls the specified callback function.*/

// catch 404 and forward to error handler
/*Bind error handler middleware to an instance of the app object by using the app.use() and app.METHOD() functions,
  where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST)
  more than one callback function can handle a route,the response(error) will be sent by next function
  */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*Middleware functions are functions that have access to the request object (req), the response object (res),
  and the next middleware function in the application’s request-response cycle.
  Middleware functions can perform the following tasks:
   1. Execute any code.
   2. Make changes to the request and the response objects.
   3. End the request-response cycle.
   4. Call the next middleware function in the stack.
   If the current middleware function does not end the request-response cycle, it must call next() to pass control
   to the next middleware function. Otherwise, the request will be left hanging.
 */
/* respond with error handler function when GET request method happens ,evn is type of a key,it returns the value of env app,where
 env is one of the strings in the app setting table,and if that value is equal to development then raise error handler function.
 error handler function is middleware. An Express app is valid middleware. */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      //sets the HTTP status for the response.
    res.status(err.status || 500);
    //res.render -> if a callback is specified, the rendered HTML string has to be sent explicitly
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function (err,req,res,next){
    if(req.header['kljuc']  && req.header['kljuc'] === "nekavrijednost") {
        next();
    }else {
        res.status(401).send("Unauthorized");
    }
} );


// production error handler
// no stacktraces leaked to user
/*Bind error handler middleware to an instance of the app object by using the app.use() and app.METHOD() functions,
  where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST)
  Use or Raise error when sth happens
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*Renders a view and sends the rendered HTML string to the client
   The view argument is a string that is the file path of the view file to render.
   This can be an absolute path, or a path relative to the views setting.
   If the path does not contain a file extension, then the view engine setting determines the file extension.
   If the path does contain a file extension, then Express will load the module for the specified template engine
   (via require()) and render it using the loaded module’s __express function.
  */
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//A module encapsulates related code into a single unit code. My app is encapsulated in module.exports{}
module.exports = app;
