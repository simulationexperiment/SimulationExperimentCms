let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('systemIntroduce4Transport', {title: '3D运输管理系统介绍'});
});


module.exports = router;
