var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hello students!',
    message: 'it is very nice to have you here!'
  });
});

module.exports = router;
