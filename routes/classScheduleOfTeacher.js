let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('classScheduleOfTeacher', { title: '教师课程表' });
});

module.exports = router;
