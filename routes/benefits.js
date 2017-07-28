var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "[BENEFITS PACKAGE 1]"
  }, {
  	id: 2,
  	username: "[BENEFITS PACKAGE 2]"
  }]);
});

router.post('/', function(req, res) { });
router.get('/:id', function(req, res) { });

module.exports = router;