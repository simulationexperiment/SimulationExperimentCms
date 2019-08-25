let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('classSchedule');
  let systemID = req.query.systemID;

  if(systemID !== undefined){
    service.get(systemID, function (result) {
      let renderData = commonService.buildRenderData('总课程表', 0, result);
      renderData.systemID = systemID;
      res.render('classSchedule', renderData);
    });
  }else{
    res.render('classSchedule', {title: '总课程表', systemID: 0});
  }
});

module.exports = router;
