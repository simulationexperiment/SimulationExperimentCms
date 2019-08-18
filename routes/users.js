let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users', { title: '账户管理' });
});

module.exports = router;
