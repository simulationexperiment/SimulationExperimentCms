let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const knowledgeRouter = require('./routes/knowledge');
const exercisesRouter = require('./routes/exercises');

const systemIntroduce4TransportRouter = require('./routes/systemIntroduce4Transport');
const experimentPurposes4TransportRouter = require('./routes/experimentPurposes4Transport');
const experimentRequirement4TransportRouter = require('./routes/experimentRequirement4Transport');

const myResourceRouter = require('./routes/myResource');
const waitingResourceRouter = require('./routes/waitingResource');
const usingResourceRouter = require('./routes/usingResource');
const refusedResourceRouter = require('./routes/refusedResource');

// const systemAccountRouter = require('./routes/systemAccount');
// const systemAccountEditRouter = require('./routes/systemAccountEdit');
// const orderRouter = require('./routes/order');
// const orderEditRouter = require('./routes/orderEdit');
const commonRouter = require('./routes/common');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//登录拦截器
app.use(function (req, res, next) {
  let url = req.originalUrl;
  if (url !== '/' && req.cookies['bwa.user'] === undefined) {
    return res.redirect("/");
  }
  next();
});

app.use('/', loginRouter);
app.use('/index', indexRouter);
app.use('/knowledge', knowledgeRouter);
app.use('/exercises', exercisesRouter);
app.use('/systemIntroduce/transport', systemIntroduce4TransportRouter);
app.use('/experimentPurposes/transport', experimentPurposes4TransportRouter);
app.use('/experimentRequirement/transport', experimentRequirement4TransportRouter);
app.use('/myResource', myResourceRouter);
app.use('/waitingResource', waitingResourceRouter);
app.use('/usingResource', usingResourceRouter);
app.use('/refusedResource', refusedResourceRouter);

// app.use('/systemAccount', systemAccountRouter);
// app.use('/systemAccount/edit', systemAccountEditRouter);
// app.use('/order', orderRouter);
// app.use('/order/edit', orderEditRouter);
app.use('/common', commonRouter);

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
