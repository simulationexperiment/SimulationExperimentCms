let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('classSchedule4Teacher');
  let systemID = req.query.systemID;
  let teacherID = req.query.teacherID;
  let teacherName = req.query.teacherName;

  if(systemID !== undefined && teacherID !== undefined){
    let parameter = systemID + '/' + teacherID;

    service.get(parameter, function (result) {
      let renderData = commonService.buildRenderData('教师课程表', 0, result);
      renderData.systemID = systemID;
      renderData.teacherID = teacherID;
      renderData.teacherName = teacherName;
      res.render('classScheduleOfTeacher', renderData);
    });
  }else{
    res.render('classScheduleOfTeacher', {title: '教师课程表', systemID: 0, teacherID: 0, teacherName: ''});
  }
});

module.exports = router;
