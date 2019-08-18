let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('bookingLaboratory', {title: '预约实验室'});
});


module.exports = router;
