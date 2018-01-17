var express = require('express');
var router = express.Router();
var apiconnector = require('../helpers/apiconnector');

/* GET home page. */
router.get('/', function(req, res, next) {

  var resetid = req.query.tk;
  var email = req.query.email;

  if (!resetid) {
    res.render('reset', {
      title: 'Reset',
      error: "Password reset ID not supplied"
    });
    return;
  } else if (!email) {
    res.render('reset', {
      title: 'Reset',
      error: "Emails not supplied"
    });
    return;
  } else {
    res.render('reset', {
      title: 'Reset',
      resid: resetid,
      email: email
    });
    return;
  }
});

router.post('/', function(req, res, next) {
  console.log("info", "called post");
  console.log("info", req.body.mail);

  var config = req.app.get('config');

  var pwd = req.body.key;
  var email = req.body.mail;
  var resetid = req.body.resid;

  if (!pwd) {
    res.render('reset', {
      title: 'Reset',
      error: "Password not supplied"
    });
    return;
  } else if (!email) {
    res.render('reset', {
      title: 'Reset',
      error: "Email not supplied"
    });
    return;
  } else if (!resetid) {
    res.render('reset', {
      title: 'Reset',
      error: "Password reset ID not supplied"
    });
    return;
  }

  jsonObject = JSON.stringify({
    "email": email,
    "password": pwd
  });

  apiconnector.postClient(null, 'auth/resetpwd/' + resetid, req.app.get('config'), jsonObject, function(err, data) {

    if (err) {
      res.render('reset', {
        title: 'Reset',
        error: err.message
      });
      return;
    } else {
      res.render('reset', {
        title: 'Reset',
        error: "Password updated",
        email: "someone@example.com"
      });
      return;
    }
  });


});

module.exports = router;
