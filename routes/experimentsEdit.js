let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentsEdit', {title: '实验库编辑' , experimentID: req.query.experimentID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('experiment');
  let parameter = req.query.experimentID;

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
        experimentInfo: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('experiment');
  let data = {
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentName: req.body.experimentName,
    experimentContent: req.body.experimentContent,
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
  let service = new commonService.commonInvoke('experiment');
  let data = {
    experimentID: req.body.experimentID,
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    experimentTypeID: req.body.experimentTypeID,
    experimentName: req.body.experimentName,
    experimentContent: req.body.experimentContent,
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
