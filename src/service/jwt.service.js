const jwt = require("jwt-simple");
const dayjs = require("dayjs");

const secret = require("../config/global.config");
// .add(1, "days")
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