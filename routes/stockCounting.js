let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('stockCounting', { title: '货物盘点' });
});

module.exports = router;
