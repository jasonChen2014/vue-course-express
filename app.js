var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//use 使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

//自定义白名单
const whiteUrl = {
  get: [
    '/get_file_list'
  ],
  post:[
    '/users/login',
    '/upload_file',
    '/get_file'
  ]
}

function hasOneOf(str,arr) {//判断一个字符串是否存在与数组中
  return arr.some(item => arr.includes(str))
}

app.all('*', function(req, res, next) {
  const method = req.method.toLowerCase()
  const path = req.path
  if(whiteUrl[method] && hasOneOf(path,whiteUrl[method])) {//存在于白名单，不用鉴权
    next()
  }else{
    let token = req.headers.token
    if(!token) res.status(401).send({code:401,mes:'token no exist'})
    else {
      jwt.verify(token,'1234',(error,decode) => {
        if(error) {
          res.send({code:401,mes:'token error'})
        }else{
          req.userName = decode.name
          next()
        }
      })
    }
  }
  //const token = req.header.token

})


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
