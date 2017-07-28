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
  	username: "[CLAIM NAME 1]"
  }, {
  	id: 2,
  	username: "[CLAIM NAME 2]"
  }]);
});

router.post('/', function(req, res) { });
router.get('/:id', function(req, res) { });
router.patch('/:id', function(req, res) { });

module.exports = router;