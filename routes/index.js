var express = require('express');
var router = express.Router();
var util = require('util');
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("info", "called get");
  res.render('index', {
    title: 'SimpleAuthService'
  });
});

router.post('/', function(req, res, next) {
  console.log("info", "called post");



  console.log("info", req.body.email);
  //  res.write('received the data:\n\n');




  res.render('index', {
    title: 'SimpleAuthService',
    error: "Thanks for registering. We'll be in touch!"
  });
});



module.exports = router;
