let express = require('express');
let router = express.Router();
let commonService = require('../service/commonService');

router.get('/', function(req, res, next) {
  res.render('login', { title: '用户登录', layout: null });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('login');
  let param = req.body.cellphone + '/' + req.body.password;

  service.get(param, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        adminInfo: result.content.responseData
      });
    }
  })
});

module.exports = router;