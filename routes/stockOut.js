let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('stockOut', { title: '货物出库' });
});

module.exports = router;
