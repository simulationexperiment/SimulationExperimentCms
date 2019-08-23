let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('experimentAssign');
  let pageNumber = req.query.pageNumber;
  let systemID = req.query.systemID;
  let courseID = req.query.courseID;
  let experimentTypeID = req.query.experimentTypeID;
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
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + experimentTypeID;

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('布置新实验', pageNumber, result);
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.experimentTypeID = experimentTypeID;
    res.render('assignExperiment', renderData);
  });
});

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('experimentAssign');
  let experimentAssignID = req.query.experimentAssignID;

  service.delete(experimentAssignID, function (result) {
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
