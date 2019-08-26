let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('qa');
  let pageNumber = req.query.pageNumber;
  let loginUser = req.cookies.secmsUserID;

  if(pageNumber === undefined){
    pageNumber = 1;
  }

  let parameter = pageNumber + '/9999';

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('问题留言', pageNumber, result);
    if(renderData.dataList !== null){
      for(let data of renderData.dataList){
        if(data.question.questionUser === parseInt(loginUser)){
          data.allowDeleteQuestion = true;
        }
        data.answerCount = data.answerList.length;
      }
    }
    res.render('QA', renderData);
  });
});

router.post('/question', function (req, res, next) {
  let service = new commonService.commonInvoke('question');
  let data = {
    question: req.body.question,
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

router.post('/answer', function (req, res, next) {
  let service = new commonService.commonInvoke('answer');
  let data = {
    questionID: req.body.questionID,
    answer: req.body.answer,
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

module.exports = router;
