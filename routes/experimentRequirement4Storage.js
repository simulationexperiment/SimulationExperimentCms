let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentRequirement4Storage', {title: '3D仓储实验要求'});
});


module.exports = router;
