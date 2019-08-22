let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('teachingResource');
  let pageNumber = req.query.pageNumber;
  let systemID = req.query.systemID;
  let courseID = req.query.courseID;
  let resourceTypeID = req.query.resourceTypeID;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(systemID === undefined){
    systemID = 0;
  }
  if(courseID === undefined){
    courseID = 0;
  }
  if(resourceTypeID === undefined){
    resourceTypeID = 0;
  }
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + resourceTypeID;

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('知识点管理', pageNumber, result);
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.resourceTypeID = resourceTypeID;
    res.render('myResource', renderData);
  });
});

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('teachingResource');
  let resourceID = req.query.resourceID;

  service.delete(resourceID, function (result) {
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
