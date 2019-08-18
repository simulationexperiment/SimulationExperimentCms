let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentReport', { title: '实验报告' });
});

module.exports = router;
