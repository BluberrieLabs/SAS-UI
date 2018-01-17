var rp = require('request-promise');

module.exports = {

  getClient: function(token, edge, config, callback) {


    if (token) {
      //get no of records
      var getheaders = {
        'X-API-KEY': config.api.key,
        'Authorization': 'Bearer ' + token
      };
    } else {
      var getheaders = {
        'X-API-KEY': config.api.key
      };
    }

    var options = {
      uri: config.api.api + edge,
      method: 'GET',
      headers: getheaders,
      resolveWithFullResponse: true
    };


    rp(options)
      .then(function(response) {
        console.log("GET succeeded with status %d", response.statusCode);

        //  console.info('GET result:\n' + response.body);

        if (response.statusCode == 200) {

          if (response.body) {
            jsonRep = JSON.parse(response.body);
            return callback(null, jsonRep);
          } else {
            return callback(null, "ok");
          }

        } else {
          jsonRep = JSON.parse(response.body);
          return callback(new Error(jsonRep.error));
        }

      })
      .catch(function(err) {
        console.info(err);

        if (err.response && err.response.body) {
          try {
            jsonErr = JSON.parse(err.response.body);

            if (jsonErr) {
              if (jsonErr.error) {
                return callback(new Error(jsonErr.error));
              }
            }
          } catch (e) {
            console.info("Error parsing json");
          }
        }
        return callback(new Error('Error'));

      });

  },

  deleteClient: function(token, edge, config, callback) {


    if (token) {
      //get no of records
      var getheaders = {
        'X-API-KEY': config.api.key,
        'Authorization': 'Bearer ' + token
      };
    } else {
      var getheaders = {
        'X-API-KEY': config.api.key
      };
    }

    var options = {
      uri: config.api.api + edge,
      method: 'DELETE',
      headers: getheaders,
      resolveWithFullResponse: true
    };


    rp(options)
      .then(function(response) {
        console.log("DELETE succeeded with status %d", response.statusCode);

        //  console.info('GET result:\n' + response.body);

        if (response.statusCode == 200) {

          if (response.body) {
            jsonRep = JSON.parse(response.body);
            return callback(null, jsonRep);
          } else {
            return callback(null, "ok");
          }

        } else {
          jsonRep = JSON.parse(response.body);
          return callback(new Error(jsonRep.error));
        }

      })
      .catch(function(err) {
        console.info(err);

        if (err.response && err.response.body) {
          try {
            jsonErr = JSON.parse(err.response.body);

            if (jsonErr) {
              if (jsonErr.error) {
                return callback(new Error(jsonErr.error));
              }
            }
          } catch (e) {
            console.info("Error parsing json");
          }
        }
        return callback(new Error('Error'));

      });

  },

  postClient: function(token, edge, config, payload, callback) {


    if (token) {
      var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload, 'utf8'),
        'X-API-KEY': config.api.key,
        'Authorization': 'Bearer ' + token
      };
    } else {
      var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload, 'utf8'),
        'X-API-KEY': config.api.key
      };
    }
    var optionspost = {
      uri: config.api.api + edge,
      method: 'POST',
      headers: postheaders,
      body: payload,
      resolveWithFullResponse: true
    };

    console.info('Options prepared:');
    console.info(optionspost);
    console.info('Do the POST call');


    rp(optionspost)
      .then(function(response) {
        console.log("POST succeeded with status %d", response.statusCode);

        console.info('POST result:\n');
        //process.stdout.write(d);
        console.info('\n\nPOST completed');

        if (response.statusCode == 200) {
          if (response.body) {
            jsonRep = JSON.parse(response.body);
            return callback(null, jsonRep);
          } else {
            return callback(null, "ok");
          }
        } else {
          jsonRep = JSON.parse(response.body);
          return callback(new Error(jsonRep.error));
        }

      })
      .catch(function(err) {
        console.info(err);

        if (err.response && err.response.body) {
          jsonErr = JSON.parse(err.response.body);
          if (jsonErr) {
            if (jsonErr.error) {
              return callback(new Error(jsonErr.error));
            }
          }
        }

        if (err.message) {
          return callback(new Error(err.message));
        }

        return callback(new Error("Error making connection"));

      });

  }

};
