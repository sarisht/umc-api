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
  	username: "[DEVELOPER NAME 1]"
  }, {
  	id: 2,
  	username: "[DEVELOPER NAME 2]"
  }]);
});

router.post('/users', function(req, res) { });
router.get('/users/:id', function(req, res) { });

router.post('/benefits', function(req, res) { });
router.get('/benefits/:id', function(req, res) { });
router.delete('/benefits', function(req, res) { });

router.post('/claims', function(req, res) { });
router.get('/claims', function(req, res) { });
router.get('/claims/:id', function(req, res) { });
router.patch('/claims/:id', function(req, res) { });

module.exports = router;