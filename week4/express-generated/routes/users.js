var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('error', {
    message: 'it is very nice to have you here!',
    error: {
      status: 200,
      stack: 'The stack!'
    }
  });
});

module.exports = router;
