let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('exercisesEdit', {title: '习题编辑' , exercisesID: req.query.exercisesID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('exercises');
  let parameter = req.query.exercisesID;

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
        exercisesInfo: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('exercises');
  let data = {
    systemID: req.body.systemID,
    exercisesTypeID: req.body.exercisesTypeID,
    courseID: req.body.courseID,
    knowledgeID: req.body.knowledgeID,
    experimentTypeID: req.body.experimentTypeID,
    exercisesContent: req.body.exercisesContent,
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
  let service = new commonService.commonInvoke('exercises');
  let data = {
    exercisesID: req.body.exercisesID,
    systemID: req.body.systemID,
    exercisesTypeID: req.body.exercisesTypeID,
    courseID: req.body.courseID,
    knowledgeID: req.body.knowledgeID,
    experimentTypeID: req.body.experimentTypeID,
    exercisesContent: req.body.exercisesContent,
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
