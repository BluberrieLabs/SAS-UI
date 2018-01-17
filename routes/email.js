var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

var apiconnector = require('../helpers/apiconnector');


/* GET home page. */
router.get('/', auth, function(req, res, next) {

  apiconnector.getClient(req.token, 'admin/mail', req.app.get('config'), function(err, data) {
    if (err) {
      res.render('email', {
        title: 'Emails',
        error: err.message,
        layout: 'manage-layout'
      });
      return;
    } else {
      res.render('email', {
        title: 'Emails',
        users: data,
        layout: 'manage-layout'
      });
      return;
    }
  });


});


module.exports = router;
