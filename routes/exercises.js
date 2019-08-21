let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('exercises');
  let pageNumber = req.query.pageNumber;
  let systemID = req.query.systemID;
  let knowledgeID = req.query.knowledgeID;
  let creator = req.query.creator;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(systemID === undefined){
    systemID = 0;
  }
  if(knowledgeID === undefined){
    knowledgeID = 0;
  }
  if(creator === undefined){
    creator = 0;
  }
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + knowledgeID + '/' + creator;

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('习题库管理', pageNumber, result);
    renderData.systemID = systemID;
    renderData.knowledgeID = knowledgeID;
    renderData.creator = creator;
    res.render('exercises', renderData);
  });
});

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('exercises');
  let exercisesID = req.query.exercisesID;

  service.delete(exercisesID, function (result) {
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
