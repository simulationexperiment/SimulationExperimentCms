let express = require('express');
let commonService = require('../service/commonService');
let uploadUtils = require('../common/uploadUtils');
let upload = uploadUtils.createUploadObject(['public','upload','resource']);
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('myResourceEdit', {title: '教学资源编辑' , resourceID: req.query.resourceID});
});

router.get('/detail', function (req, res, next) {
  let service = new commonService.commonInvoke('teachingResource');
  let parameter = req.query.resourceID;

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
        resourceInfo: result.content.responseData
      });
    }
  });
});

router.post('/fileUpload',  upload.array('file', 10), function(req,res,next){
  let uploadImageUrlArray = [];
  req.files.forEach(function (file, index) {
    uploadImageUrlArray.push('http://' + req.headers.host + '/upload/resource/' + file.originalname)
  });
  //将其发回客户端
  res.json({
    err : false,
    fileUrl : uploadImageUrlArray
  });
  res.end();
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('teachingResource');
  let data = {
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    resourceTypeID: req.body.resourceTypeID,
    resourceUri: req.body.resourceUri,
    auditorID: req.body.auditorID,
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
  let service = new commonService.commonInvoke('teachingResource');
  let data = {
    resourceID: req.body.resourceID,
    systemID: req.body.systemID,
    courseID: req.body.courseID,
    resourceTypeID: req.body.resourceTypeID,
    resourceUri: req.body.resourceUri,
    auditorID: req.body.auditorID,
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