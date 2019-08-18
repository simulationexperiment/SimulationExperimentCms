let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('assignExperiment', { title: '布置新实验' });
});

module.exports = router;
