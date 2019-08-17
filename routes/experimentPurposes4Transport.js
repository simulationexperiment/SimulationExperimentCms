let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('experimentPurposes4Transport', {title: '3D运输实验目的'});
});


module.exports = router;
