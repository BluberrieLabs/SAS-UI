var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

router.get('/', auth, function(req, res, next) {

  res.clearCookie("token");

  res.redirect('/login');

});

module.exports = router;
