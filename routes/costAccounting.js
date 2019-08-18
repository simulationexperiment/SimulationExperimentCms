let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('costAccounting', { title: '费用核算' });
});

module.exports = router;
