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
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + resourceTypeID + '/A';

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('教学资源库', pageNumber, result);
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.resourceTypeID = resourceTypeID;
    res.render('usingResource', renderData);
  });
});

module.exports = router;
