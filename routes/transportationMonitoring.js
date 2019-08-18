let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('transportationMonitoring', { title: '运输调度及监控' });
});

module.exports = router;
