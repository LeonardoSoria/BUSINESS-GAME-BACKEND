const globalDB = require("../config/database.config");
const dayjs = require("dayjs");
const jwt = require("jwt-simple");

const secret = require("../config/global.config");

/**
 * 
 * @param {*} req This param is the request 
 * @param {*} res This param is the respones
 * @param {*} next This param is the pass to the next step
 * 
 * In this functions we validate the jwt received from the front end
 */
exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "La petición no tiene cabecera de autorización"
    });
  }
  let token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, secret.secret_token);
    // console.log(payload.exp + " ---- " + dayjs().unix());
    if (payload.exp <= dayjs().unix()) {
      return res.status(401).send({
        message: "El token ha expirado"
      });
    }
  } catch (error) {
    return res.status(404).send({
      message: "El token no es válido"
    });
  }

  req.usr_login = payload.usr_login;
  req.id_database = payload.id_database;
  const configDB = globalDB.find(fruta => fruta.id === Number(req.id_database));
  if (configDB === undefined) {
    res.json({
      ok: false,
      message: "Base de datos no encontrada"
    });
  }

  if (configDB.estado) {
    req.database = configDB;
    next();
  } else {
    res.json({
      ok: false,
      message: "Base de datos no encontradas"
    });
  }
};
