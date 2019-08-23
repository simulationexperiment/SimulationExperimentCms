let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('assignExperimentEdit', {title: '布置实验信息编辑' , experimentAssignID: req.query.experimentAssignID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentAssign');
  let parameter = req.query.experimentAssignID;

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
        experimentAssignInfo: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentAssign');
  let data = {
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentID: req.body.experimentID,
    experimentTimes: req.body.experimentTimes,
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
  let service = new commonService.commonInvoke('experimentAssign');
  let data = {
    experimentAssignID: req.body.experimentAssignID,
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentID: req.body.experimentID,
    experimentTimes: req.body.experimentTimes,
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
