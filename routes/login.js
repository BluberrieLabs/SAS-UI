var express = require('express');
var router = express.Router();
var apiconnector = require('../helpers/apiconnector');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});


router.get('/reset', function(req, res, next) {

  var email = req.query.email;

  //fail silently if not supplied
  if (email) {
    apiconnector.getClient(null, 'auth/forgotpwd?email=' + email, req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error getting reset email " + error.message);
        res.status(500).json({
          status: error.message
        });
      } else {
        res.status(200).json({
          status: "ok"
        });
      }
      return;
    });
  } else {
    res.status(500).json({
      status: "Email not supplied"
    });
    return;
  }
});

router.post('/', function(req, res, next) {

  var pwd = req.body.key;
  var email = req.body.email;

  if (!pwd) {
    res.render('login', {
      title: 'Login',
      error: "Password not supplied"
    });
    return;
  } else if (!email) {
    res.render('login', {
      title: 'Login',
      error: "Email not supplied"
    });
    return;
  }

  jsonObject = JSON.stringify({
    "email": email,
    "password": pwd
  });

  apiconnector.postClient(null, 'auth/auth?web=true', req.app.get('config'), jsonObject, function(err, data) {

    if (err) {
      res.render('login', {
        title: 'Login',
        error: err.message
      });
      return;
    } else {
      res.cookie('token', data.token, {
        secure: true,
        httpOnly: true,
        maxAge: 43200000
      });

      console.log("cookie; " + data.token);

      res.redirect('/manage');
      return;
    }


  });


});

module.exports = router;
