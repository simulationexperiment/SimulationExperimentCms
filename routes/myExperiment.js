let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myExperiment', { title: '我的实验库' });
});

module.exports = router;
