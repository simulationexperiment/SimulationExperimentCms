let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('user');
  let pageNumber = req.query.pageNumber;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  let parameter = pageNumber + '/' + sysConfig.pageSize + '/A';

  service.get(parameter, function (result) {
    let renderData = commonService.buildRenderData('账户管理', pageNumber, result);
    if(renderData.dataList !== null){
      for(let user of renderData.dataList){
        if(user.userRole === 'T' || user.userRole === 'S'){
          user.isShowOption = true;
        }
      }
    }
    res.render('users', renderData);
  });
});

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('user');
  let userID = req.query.userID;

  service.delete(userID, function (result) {
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
