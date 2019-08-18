let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('QA', { title: '问题留言板' });
});

module.exports = router;
