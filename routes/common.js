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
  let parameter = '1/999/N';

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

router.get('/experimentType', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentType');
  let parameter = '1/999/N';

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

module.exports = router;
