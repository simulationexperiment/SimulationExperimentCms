let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('classScheduleOfTeacherEdit', {title: '教师课程编辑' , scheduleID: req.query.scheduleID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('classSchedule4Teacher');
  let parameter = req.query.scheduleID;

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
        classScheduleInfo: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('classSchedule4Teacher');
  let data = {
    systemID: req.body.systemID,
    teacherID: req.body.teacherID,
    courseOrder: req.body.courseOrder,
    mondayCourse: req.body.mondayCourse,
    tuesdayCourse: req.body.tuesdayCourse,
    wednesdayCourse: req.body.wednesdayCourse,
    thursdayCourse: req.body.thursdayCourse,
    fridayCourse: req.body.fridayCourse,
    saturdayCourse: req.body.saturdayCourse,
    sundayCourse: req.body.sundayCourse,
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

module.exports = router;
