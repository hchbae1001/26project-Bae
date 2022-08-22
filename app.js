var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var pushRouter = require('./routes/push');
// let boardRouter = require('./routes/board');
// hash 암호화
let bcrypt = require('bcrypt');
var sequelize = require('./models').sequelize;
// sequelize.sync();
//restAPI 용 미들웨어
var methodOverride = require('method-override');
//session
let session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
let options = {
    host: 'localhost',
    port: 3306,
    user: 'tools',
    password: '22110096',
    database: 'tools'
};
var app = express();


let sessionStore = new MySQLStore(options);
app.use(session({
  secret:"toolstools",
  resave:false,
  saveUninitialized:true,
  store:sessionStore
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
//patch나 delete일때 사용
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jQuery', express.static((__dirname + '/node_modules/jquery/dist/'))); //jQuery
app.use('/bootStrap', express.static(__dirname + '/node_modules/bootstrap/dist/')); // bootstrap JS
app.use('/js',express.static(__dirname + '/public/javascripts/'));
app.use('/css',express.static(__dirname + '/public/stylesheets/'));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/push', pushRouter);
//app.use('/board', boardRouter);///
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
