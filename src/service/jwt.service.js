const jwt = require("jwt-simple");
const dayjs = require("dayjs");

const secret = require("../config/global.config");

/**
 * 
 * @param {*} user this is the current user
 * @param {*} id_database this is the database that we're going to use
 * 
 * In this function we create the token that is goint to be used everywhere
 * in the application
 */
exports.createToken = function(user, id_database) {
  var payload = {
    id_database,
    usr_login: user.user_name,
    iat: dayjs().unix(),
    exp: dayjs()    
      .add(8, "hours")
      .unix()
  };
  return jwt.encode(payload, secret.secret_token);
};