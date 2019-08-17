let express = require('express');
let commonService = require('../service/commonService');
let uploadUtils = require('../common/uploadUtils');
let upload = uploadUtils.createUploadObject(['public','upload','resource']);
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
  res.render('myResource', {title: '我的资源库'});
});

router.post('/fileUpload',  upload.array('file', 10), function(req,res,next){
  let uploadImageUrlArray = [];
  req.files.forEach(function (file, index) {
    uploadImageUrlArray.push('http://' + req.headers.host + '/upload/resource/' + file.originalname)
  });
  //将其发回客户端
  res.json({
    err : false,
    imageUrl : uploadImageUrlArray
  });
  res.end();
});

module.exports = router;
