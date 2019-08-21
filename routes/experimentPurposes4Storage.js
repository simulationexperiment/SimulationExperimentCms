let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentPurposes4Storage', {title: '3D仓储实验目的'});
});

module.exports = router;
