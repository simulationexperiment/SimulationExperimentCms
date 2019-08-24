let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('usersEdit', {title: '用户信息编辑' , userID: req.query.userID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('user');
  let parameter = req.query.userID;

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
        userInfo: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('user');
  let data = {
    cellphone: req.body.cellphone,
    userCode: req.body.userCode,
    fullName: req.body.fullName,
    sex: req.body.sex,
    userRole: req.body.userRole,
    email: req.body.email,
    password: '111111',
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
  let service = new commonService.commonInvoke('user');
  let data = {
    userID: req.body.userID,
    cellphone: req.body.cellphone,
    userCode: req.body.userCode,
    fullName: req.body.fullName,
    sex: req.body.sex,
    userRole: req.body.userRole,
    email: req.body.email,
    password: req.body.password,
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
