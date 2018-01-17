var express = require('express');
var router = express.Router();
var apiconnector = require('../helpers/apiconnector');
var util = require('util');
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', auth, function(req, res, next) {

  apiconnector.getClient(req.token, 'admin/triggers', req.app.get('config'), function(err, data) {

    if (err) {
      res.render('messages', {
        title: 'Messages',
        error: err.message,
        layout: 'manage-layout'
      });
    } else {
      var msgid = req.query.msgid;

      if (msgid) {

        apiconnector.getClient(req.token, 'admin/mail/' + msgid, req.app.get('config'), function(err2, data2) {

          if (!err) {

            for (var i = 0; i < data.length; i++) {
              if (data[i].triggerTag == data2.triggerTag) {
                data[i].selected = true;
              } else {
                data[i].selected = false;
              }
            }

            console.log("Data2 type "+Object.prototype.toString.call(data2))

            res.render('messages', {
              title: 'Messages',
              trigger: data,
              mess: data2,
              layout: 'manage-layout'
            });
          } else {
            res.render('messages', {
              title: 'Messages',
              trigger: data,
              layout: 'manage-layout'
            });
          }

        });

      } else {
        res.render('messages', {
          title: 'Messages',
          trigger: data,
          layout: 'manage-layout'
        });

      }
    }
  });
});

router.post('/', auth, function(req, res, next) {
  var sender = req.body.sender;
  var subject = req.body.subject;
  var desc = req.body.description;
  var trigger = req.body.triggers;
  var personal = req.body.personal;

  var payload = {
    "sender": sender,
    "subject": subject,
    "triggerTag": trigger,
    "body": desc,
    "personal": personal
  };

  console.log(util.inspect(payload));

  //check params
  if (!sender || !subject || !desc || !trigger) {

    apiconnector.getClient(req.token, 'admin/triggers', req.app.get('config'), function(err, data) {

      if (err) {
        res.render('messages', {
          title: 'Messages',
          error: "Incomplete form data",
          layout: 'manage-layout'
        });
        return;

      } else {
        for (var i = 0; i < data.length; i++) {
          if (data[i].triggerTag == payload.triggerTag) {
            data[i].selected = true;
          } else {
            data[i].selected = false;
          }
        }
        console.log("Rendering with JSONObject");
        console.log(payload.body);
        console.log("jsonObject type "+Object.prototype.toString.call(payload))

        res.render('messages', {
          title: 'Messages',
          trigger: data,
          mess: payload,
          error: "Incomplete form data",
          layout: 'manage-layout'
        });
        return;

      }

    });

  } else {

    apiconnector.postClient(req.token, 'admin/mail', req.app.get('config'), JSON.stringify(payload), function(err, data) {

      if (err) {
        res.render('messages', {
          title: 'Messages',
          error: err.message,
          layout: 'manage-layout'
        });
      } else {
        res.redirect('/manage/email');
      }
    });
  }
});


module.exports = router;
