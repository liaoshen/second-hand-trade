var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var fs=require('fs');
var moment = require('moment');

var User=require('./lib/user');
var itemModel=User.itemModel;

var filter=require('./lib/nameChange');
var en2ch=filter.en2ch;


var mongoose=require('mongoose');
var route=require('./lib/route');

var app = express();
var dbUrl = 'mongodb://127.0.0.1/imovie';


// view engine setup

app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
   secret: 'imovie',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: dbUrl,

      collection: 'sessions'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',route.index);
app.get('/a',function(req,res){
    var data=fs.readFileSync('views/a.html');
    res.end(data)
});
app.get('/public/files/:id',function(req,res){
    var id=req.params.id;
    var path='public/files/'+id;
    var data=fs.readFileSync(path);
    res.end(data);
})

app.get('/category/:id',route.category);
app.get('/item/:id',route.itemdetail);

app.get('/getUsers',route.getUsers);
app.get('/getItems',route.getItems);
app.get('/login',route.loginindex)
app.post('/login',route.login);
app.get('/register',route.registerindex);
app.post('/register',route.regist);
app.get('/logout',route.logout);
app.get('/getLoginUser',route.getLoginUser);
app.post('/post',route.publish);
app.post('/upload',route.upload);
app.post('/myItems',route.myItems);
app.get('/about',route.about);
app.post('/changeMessage',route.changMessage);
app.post('/changeTrade',route.changeTrade);
app.post('/changePassword',route.changPassword);




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
    res.json( {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});
moment.lang('zh-cn');

  http.createServer(app).listen(3000,'127.0.0.1',function(){console.log('succeed')})
