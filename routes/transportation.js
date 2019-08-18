let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('transportation', { title: '运输实现' });
});

module.exports = router;
