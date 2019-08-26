let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('laboratoryAppointment');
  let pageNumber = req.query.pageNumber;
  let fromDate = req.query.fromDate;
  let toDate = req.query.toDate;
  let loginUser = req.cookies.secmsUserID;

  if(pageNumber === undefined){
    pageNumber = 1;
  }

  if(fromDate !== undefined && toDate !== undefined){
    let parameter = pageNumber + '/' + sysConfig.pageSize + '/' + fromDate + '/' + toDate;

    service.get(parameter, function (result) {
      let renderData = commonService.buildRenderData('预约实验室', pageNumber, result);
      if(renderData.dataList !== null){
        for(let data of renderData.dataList){
          if(data.appointmentUser === parseInt(loginUser)){
            data.allowDelete = true;
          }
        }
      }

      renderData.fromDate = fromDate;
      renderData.toDate = toDate;
      res.render('bookingLaboratory', renderData);
    });
  }else{
    res.render('bookingLaboratory', {title: '预约实验室'});
  }
});

router.get('/checkLaboratoryScheduled', function (req, res, next) {
  let service = new commonService.commonInvoke('checkLaboratoryScheduled');
  let laboratoryDate = req.query.laboratoryDate;
  let courseOrder = req.query.courseOrder;
  let laboratoryID = req.query.laboratoryID;
  let parameter = laboratoryDate + '/' + courseOrder + '/' + laboratoryID;

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
        scheduled: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('laboratoryAppointment');
  let data = {
    laboratoryDate: req.body.laboratoryDate,
    courseOrder: req.body.courseOrder,
    laboratoryID: req.body.laboratoryID,
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

router.delete('/', function (req, res, next) {
  let service = new commonService.commonInvoke('laboratoryAppointment');
  let appointmentID = req.query.appointmentID;

  service.delete(appointmentID, function (result) {
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
