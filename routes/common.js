let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/system', function (req, res, next) {
  let service = new commonService.commonInvoke('system');
  let parameter = '1/999';

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
        systemList: result.content.responseData
      });
    }
  });
});

router.get('/course', function (req, res, next) {
  let service = new commonService.commonInvoke('course');
  let parameter = '1/999';

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
        courseList: result.content.responseData
      });
    }
  });
});

router.get('/resourceType', function (req, res, next) {
  let service = new commonService.commonInvoke('resourceType');
  let parameter = '1/999';

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
        resourceTypeList: result.content.responseData
      });
    }
  });
});

router.get('/exercisesType', function (req, res, next) {
  let service = new commonService.commonInvoke('exercisesType');
  let parameter = '1/999';

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
        exercisesTypeList: result.content.responseData
      });
    }
  });
});

router.get('/experimentType', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentType');
  let parameter = '1/999';

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
        experimentTypeList: result.content.responseData
      });
    }
  });
});

router.get('/experiment', function (req, res, next) {
  let service = new commonService.commonInvoke('experiment');
  let systemID = req.query.systemID;
  let courseID = req.query.courseID;
  let experimentTypeID = req.query.experimentTypeID;
  if(systemID === undefined){
    systemID = 0;
  }
  if(courseID === undefined){
    courseID = 0;
  }
  if(experimentTypeID === undefined){
    experimentTypeID = 0;
  }
  let parameter = '1/999' + '/' + systemID + '/' + courseID + '/' + experimentTypeID;

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
        experimentList: result.content.responseData
      });
    }
  });
});

router.get('/experiment/assign', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentAssign');
  let systemID = req.query.systemID;
  let courseID = req.query.courseID;
  let experimentTypeID = req.query.experimentTypeID;
  if(systemID === undefined){
    systemID = 0;
  }
  if(courseID === undefined){
    courseID = 0;
  }
  if(experimentTypeID === undefined){
    experimentTypeID = 0;
  }
  let parameter = '1/999' + '/' + systemID + '/' + courseID + '/' + experimentTypeID;

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
        experimentList: result.content.responseData
      });
    }
  });
});

router.get('/teacher', function (req, res, next) {
  let service = new commonService.commonInvoke('user');
  let parameter = '1/999/T';

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
        teacherList: result.content.responseData
      });
    }
  });
});

router.get('/knowledge', function (req, res, next) {
  let service = new commonService.commonInvoke('knowledge');
  let systemID = req.query.systemID;
  if(systemID === undefined){
    systemID = 0;
  }
  let parameter = '1/999/' + systemID + '/0';

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
        knowledgeList: result.content.responseData
      });
    }
  });
});

router.get('/laboratory', function (req, res, next) {
  let service = new commonService.commonInvoke('laboratory');
  let parameter = '1/999';

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
        laboratoryList: result.content.responseData
      });
    }
  });
});

module.exports = router;
