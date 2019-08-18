let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentReview', { title: '实验批改' });
});

module.exports = router;
