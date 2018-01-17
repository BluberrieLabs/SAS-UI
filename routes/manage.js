var express = require('express');
var router = express.Router();
var apiconnector = require('../helpers/apiconnector');
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', auth, function(req, res, next) {

  apiconnector.getClient(req.token, 'admin/users', req.app.get('config'), function(err, data) {
    if (err) {
      res.render('manage', {
        title: 'Manage',
        error: err.message,
        layout: 'manage-layout'
      });
      return;
    } else {
      res.render('manage', {
        title: 'Manage',
        users: data,
        layout: 'manage-layout'
      });
      return;
    }
  });


});

router.get('/apiclose', auth, function(req, res, next) {

  var userid = req.query.userid;

  //fail silently if not supplied
  if (userid) {
    apiconnector.getClient(req.token, 'admin/user/'+userid+'/close', req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error closing account " + err.message);
        res.status(500).json({
          status: err.message
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
      status: "parameter not supplied"
    });
    return;
  }
});

router.get('/apiopen', auth, function(req, res, next) {

  var userid = req.query.userid;

  //fail silently if not supplied
  if (userid) {
    apiconnector.getClient(req.token, 'admin/user/'+userid+'/reopen', req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error closing account " + err.message);
        res.status(500).json({
          status: err.message
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
      status: "parameter not supplied"
    });
    return;
  }
});

router.get('/apilock', auth, function(req, res, next) {

  var userid = req.query.userid;

  //fail silently if not supplied
  if (userid) {
    apiconnector.getClient(req.token, 'admin/user/'+userid+'/lock', req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error closing account " + err.message);
        res.status(500).json({
          status: err.message
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
      status: "parameter not supplied"
    });
    return;
  }
});

router.get('/apiunlock', auth, function(req, res, next) {

  var userid = req.query.userid;

  //fail silently if not supplied
  if (userid) {
    apiconnector.getClient(req.token, 'admin/user/'+userid+'/unlock', req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error closing account " + err.message);
        res.status(500).json({
          status: err.message
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
      status: "parameter not supplied"
    });
    return;
  }
});

router.get('/apidelete', auth, function(req, res, next) {

  var userid = req.query.userid;

  //fail silently if not supplied
  if (userid) {
    apiconnector.deleteClient(req.token, 'admin/user/'+userid, req.app.get('config'), function(err, data) {
      if (err) {
        console.info("Error closing account " + err.message);
        res.status(500).json({
          status: err.message
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
      status: "parameter not supplied"
    });
    return;
  }
});


module.exports = router;
