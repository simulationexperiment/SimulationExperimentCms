let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const knowledgeRouter = require('./routes/knowledge');
const knowledgeEditRouter = require('./routes/knowledgeEdit');
const exercisesRouter = require('./routes/exercises');
const exercisesEditRouter = require('./routes/exercisesEdit');
const systemIntroduce4TransportRouter = require('./routes/systemIntroduce4Transport');
const experimentPurposes4TransportRouter = require('./routes/experimentPurposes4Transport');
const experimentRequirement4TransportRouter = require('./routes/experimentRequirement4Transport');
const systemIntroduce4StorageRouter = require('./routes/systemIntroduce4Storage');
const experimentPurposes4StorageRouter = require('./routes/experimentPurposes4Storage');
const experimentRequirement4StorageRouter = require('./routes/experimentRequirement4Storage');
const myResourceRouter = require('./routes/myResource');
const myResourceEditRouter = require('./routes/myResourceEdit');
const waitingResourceRouter = require('./routes/waitingResource');
const usingResourceRouter = require('./routes/usingResource');
const refusedResourceRouter = require('./routes/refusedResource');
const experimentsRouter = require('./routes/experiments');
const experimentsEditRouter = require('./routes/experimentsEdit');
const assignExperimentRouter = require('./routes/assignExperiment');
const assignExperimentEditRouter = require('./routes/assignExperimentEdit');
const createCompanyRouter = require('./routes/createCompany');
const acceptConsignmentRouter = require('./routes/acceptConsignment');
const transportationMonitoringRouter = require('./routes/transportationMonitoring');
const transportationRouter = require('./routes/transportation');
const costAccountingRouter = require('./routes/costAccounting');
const stockInRouter = require('./routes/stockIn');
const stockCountingRouter = require('./routes/stockCounting');
const deliveryRouter = require('./routes/delivery');
const stockOutRouter = require('./routes/stockOut');
const experimentReportRouter = require('./routes/experimentReport');
const experimentReviewRouter = require('./routes/experimentReview');
const experimentScoreRouter = require('./routes/experimentScore');
const classScheduleOfTeacherRouter = require('./routes/classScheduleOfTeacher');
const classScheduleRouter = require('./routes/classSchedule');
const bookingLaboratoryRouter = require('./routes/bookingLaboratory');
const viewBookedLaboratoryRouter = require('./routes/viewBookedLaboratory');
const usersRouter = require('./routes/users');
const userInfoRouter = require('./routes/userInfo');
const changePasswordRouter = require('./routes/changePassword');
const QARouter = require('./routes/QA');
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
  if (url !== '/' && req.cookies['secms.user'] === undefined) {
    return res.redirect("/");
  }
  next();
});



app.use('/', loginRouter);
app.use('/index', indexRouter);
app.use('/knowledge', knowledgeRouter);
app.use('/knowledge/edit', knowledgeEditRouter);
app.use('/exercises', exercisesRouter);
app.use('/exercises/edit', exercisesEditRouter);
app.use('/systemIntroduce/transport', systemIntroduce4TransportRouter);
app.use('/experimentPurposes/transport', experimentPurposes4TransportRouter);
app.use('/experimentRequirement/transport', experimentRequirement4TransportRouter);
app.use('/systemIntroduce/storage', systemIntroduce4StorageRouter);
app.use('/experimentPurposes/storage', experimentPurposes4StorageRouter);
app.use('/experimentRequirement/storage', experimentRequirement4StorageRouter);
app.use('/myResource', myResourceRouter);
app.use('/myResource/edit', myResourceEditRouter);
app.use('/waitingResource', waitingResourceRouter);
app.use('/usingResource', usingResourceRouter);
app.use('/refusedResource', refusedResourceRouter);
app.use('/experiments', experimentsRouter);
app.use('/experiments/edit', experimentsEditRouter);
app.use('/assignExperiment', assignExperimentRouter);
app.use('/assignExperiment/edit', assignExperimentEditRouter);
app.use('/createCompany', createCompanyRouter);
app.use('/acceptConsignment', acceptConsignmentRouter);
app.use('/transportationMonitoring', transportationMonitoringRouter);
app.use('/transportation', transportationRouter);
app.use('/costAccounting', costAccountingRouter);
app.use('/stockIn', stockInRouter);
app.use('/stockCounting', stockCountingRouter);
app.use('/delivery', deliveryRouter);
app.use('/stockOut', stockOutRouter);
app.use('/experimentReport', experimentReportRouter);
app.use('/experimentReview', experimentReviewRouter);
app.use('/experimentScore', experimentScoreRouter);
app.use('/classScheduleOfTeacher', classScheduleOfTeacherRouter);
app.use('/classSchedule', classScheduleRouter);
app.use('/bookingLaboratory', bookingLaboratoryRouter);
app.use('/viewBookedLaboratory', viewBookedLaboratoryRouter);
app.use('/userInfo', userInfoRouter);
app.use('/users', usersRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/QA', QARouter);

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
