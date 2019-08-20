let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('knowledgeEdit', {title: '知识点编辑' , knowledgeID: req.query.knowledgeID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('knowledge');
  let parameter = req.query.knowledgeID;

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
        knowledgeInfo: result.content.responseData
      });
    }
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

module.exports = router;
