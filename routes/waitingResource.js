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
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + courseID + '/' + resourceTypeID + '/P';

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('待审核资源', pageNumber, result);
    renderData.systemID = systemID;
    renderData.courseID = courseID;
    renderData.resourceTypeID = resourceTypeID;
    res.render('waitingResource', renderData);
  });
});

router.put('/changeStatus', function (req, res, next) {
  let service = new commonService.commonInvoke('teachingResourceChange');
  let data = {
    resourceID: req.body.resourceID,
    resourceStatus: req.body.resourceStatus,
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
