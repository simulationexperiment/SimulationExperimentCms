let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('experimentReport');
  let pageNumber = req.query.pageNumber;
  let systemID = req.query.systemID;
  let courseID = req.query.courseID;
  let experimentTypeID = req.query.experimentTypeID;
  let reportStatus = req.query.reportStatus;
  let auditorID = req.cookies.secmsUserID;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(systemID === undefined){
    systemID = 0;
  }
  if(courseID === undefined){
    courseID = 0;
  }
  if(experimentTypeID === undefined){
    experimentTypeID = 0;
  }
  if(reportStatus === undefined){
    reportStatus = 'A';
  }
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + experimentTypeID + '/' + reportStatus + '/0/' + auditorID;

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('实验批改', pageNumber, result);
    if(renderData.dataList !== null){
      for(let data of renderData.dataList){
        if(data.resourceStatus === 'P'){
          data.allowEdit = true;
        }
      }
    }
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.experimentTypeID = experimentTypeID;
    renderData.reportStatus = reportStatus;
    res.render('experimentReview', renderData);
  });
});

router.put('/', function (req, res, next) {
  let service = new commonService.commonInvoke('changeReportScore');
  let data = {
    reportID: req.body.reportID,
    disciplineScore: req.body.disciplineScore,
    practiceScore: req.body.practiceScore,
    reportScore: req.body.reportScore,
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
