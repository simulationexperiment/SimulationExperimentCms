let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('createCompany', { title: '公司创建' });
});

module.exports = router;
