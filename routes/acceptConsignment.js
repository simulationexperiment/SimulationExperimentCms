let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('acceptConsignment', { title: '托运任务受理' });
});

module.exports = router;
