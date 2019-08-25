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
  let resourceStatusID = req.query.resourceStatusID;
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
  if(resourceStatusID === undefined){
    resourceStatusID = 'null';
  }
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + resourceTypeID + '/' + resourceStatusID + '/0';

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('资源管理', pageNumber, result);
    if(renderData.dataList !== null){
      for(let resource of renderData.dataList){
        if(resource.resourceStatus === 'P' || resource.resourceStatus === 'R'){
          resource.allowEdit = true;
        }
      }
    }
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.resourceTypeID = resourceTypeID;
    renderData.resourceStatusID = resourceStatusID;
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
