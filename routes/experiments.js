let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('experiments', { title: '参考实验库' });
});

module.exports = router;
