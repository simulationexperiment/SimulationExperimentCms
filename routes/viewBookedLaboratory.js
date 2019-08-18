let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('viewBookedLaboratory', {title: '查看预约'});
});


module.exports = router;
