let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentRequirement4Transport', {title: '3D运输实验要求'});
});


module.exports = router;
