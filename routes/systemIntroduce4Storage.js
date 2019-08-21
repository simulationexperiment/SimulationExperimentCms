let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('systemIntroduce4Storage', {title: '3D仓储管理系统介绍'});
});


module.exports = router;
