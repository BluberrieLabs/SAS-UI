var jwt = require('jsonwebtoken');
var util = require('util');

module.exports = function(req, res, next) {

	// check header or url parameters or post parameters for token

	var token = req.cookies.token;

	// decode token
	if (typeof token !== 'undefined' && token && token.trim() && token !== 'undefined') {

				// if everything is good, save to request for use in other routes
				req.token = token;

        console.log("Token found");
        console.log("Token:" + token);

        try {
          var decoded = jwt.verify(token, req.app.get('jwtcert'), { algorithms: ['RS512'] });
          if(decoded.scopes && decoded.scopes.indexOf("administrator") > -1) {
              console.log("User logged as administrator");
              next();
          } else {
          res.clearCookie("token");
          res.render('login', { title: 'Login', error: "Invalid role" });
          return;
        }

      } catch(err) {
        console.log(err);
        res.clearCookie("token");
        res.render('login', { title: 'Login', error: "Invalid token" });
        return;
        }

	} else {
    console.log("Token not found");

		// if there is no token
		// return an error
		res.render('login', { title: 'Login', error: "No token provided" });
    return;
	}

}
