let express = require('express');
let commonService = require('../service/commonService');
let router = express.Router();

router.get('/', function(req, res, next) {
  // let service = new commonService.commonInvoke('bank');
  // let pageNumber = req.query.pageNumber;
  // let dataStatus = req.query.dataStatus;
  // if(pageNumber === undefined){
  //   pageNumber = 1;
  // }
  // if(dataStatus === undefined){
  //   dataStatus = 'A';
  // }
  //
  // service.getPageDataWithStatus(pageNumber, dataStatus, function (result) {
  //   let renderData = commonService.buildRenderData('银行管理', pageNumber, result);
  //   if(renderData.dataList !== null){
  //     for(let bank of renderData.dataList){
  //       if(bank.dataStatus === 'N'){
  //         bank.isNormal = true;
  //       }
  //       if(bank.dataStatus === 'F'){
  //         bank.isFrozen = true;
  //       }
  //       if(bank.dataStatus === 'D'){
  //         bank.isDelete = true;
  //       }
  //     }
  //   }
  //
  //   renderData.dataStatus = dataStatus;
  //   res.render('knowledge', renderData);
  // });
  res.render('refusedResource', {title: '已拒绝资源'});
});

module.exports = router;
