let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('userInfo', { title: '用户信息编辑' });
});

module.exports = router;
