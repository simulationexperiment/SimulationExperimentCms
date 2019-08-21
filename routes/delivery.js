let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('delivery', { title: '配送调度' });
});

module.exports = router;
