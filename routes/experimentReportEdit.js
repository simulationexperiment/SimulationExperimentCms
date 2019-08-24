let express = require('express');
let commonService = require('../service/commonService');
let uploadUtils = require('../common/uploadUtils');
let upload = uploadUtils.createUploadObject(['public','upload','report']);
let dateUtils = require('../common/DateUtils');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentReportEdit', {title: '实验报告编辑' , reportID: req.query.reportID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentReport');
  let parameter = req.query.reportID;

  service.get(parameter, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        experimentReportInfo: result.content.responseData
      });
    }
  });
});

router.post('/fileUpload',  upload.array('file', 10), function(req,res,next){
  let uploadImageUrlArray = [];
  req.files.forEach(function (file, index) {
    uploadImageUrlArray.push('http://' + req.headers.host + '/upload/report/' + file.originalname)
  });
  //将其发回客户端
  res.json({
    err : false,
    fileUrl : uploadImageUrlArray
  });
  res.end();
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentReport');
  let dt = new Date();
  let data = {
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentID: req.body.experimentID,
    startTime: dateUtils.formatUTC( req.body.startTime),
    endTime: dateUtils.formatUTC(req.body.endTime),
    reportUri: req.body.reportUri,
    correctorID: req.body.correctorID,
    loginUser: req.body.loginUser
  };

  service.add(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

router.put('/', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentReport');
  let data = {
    reportID: req.body.reportID,
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentID: req.body.experimentID,
    startTime: dateUtils.formatUTC( req.body.startTime),
    endTime: dateUtils.formatUTC(req.body.endTime),
    reportUri: req.body.reportUri,
    correctorID: req.body.correctorID,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;
