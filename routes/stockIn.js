let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('stockIn', { title: '入库调度' });
});

module.exports = router;
