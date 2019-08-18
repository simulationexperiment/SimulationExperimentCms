let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentScore', { title: '实验成绩' });
});

module.exports = router;
