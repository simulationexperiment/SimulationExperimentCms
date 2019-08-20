let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('knowledge');
  let pageNumber = req.query.pageNumber;
  let systemID = req.query.systemID;
  let creator = req.query.creator;
  if(pageNumber === undefined){
    pageNumber = 1;
  }
  if(systemID === undefined){
    systemID = 0;
  }
  if(creator === undefined){
    creator = 0;
  }
  let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + systemID + '/' + creator;

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('知识点管理', pageNumber, result);
    renderData.systemID = systemID;
    renderData.creator = creator;
    res.render('knowledge', renderData);
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('knowledge');
  let data = {
    systemID: req.body.systemID,
    knowledgeName: req.body.knowledgeName,
    knowledgeContent: req.body.knowledgeContent,
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
  let service = new commonService.commonInvoke('knowledge');
  let data = {
    knowledgeID: req.body.knowledgeID,
    systemID: req.body.systemID,
    knowledgeName: req.body.knowledgeName,
    knowledgeContent: req.body.knowledgeContent,
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

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('knowledge');
  let knowledgeID = req.query.knowledgeID;

  service.delete(knowledgeID, function (result) {
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
