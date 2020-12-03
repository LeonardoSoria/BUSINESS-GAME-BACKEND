const { Pool } = require("pg");
const hash = require("object-hash");
const jwToken = require("../../../service/jwt.service");

/**
 * 
 * @param {*} req This param is the request
 * @param {*} res This param is the response
 * This functions calls the instance of the database and send the data to an storage precedure that register 
 * a new user
 */
async function usr_001_register(req, res) {
  try {
    const database = new Pool(req.database);
    let { userLogin, password, email } = req.body;
    // const encryptPass = hash.sha1(password);
    const query = "select * from public.auth_001_register($1,$2,$3);";
    const results = await database.query(query, [userLogin, email, password]);
    await database.end();

    if (results.rows[0].ok) {
      let data = results.rows[0];
      res.status(200).json({
        ok: true,
        message: data.mensaje
      });
    } else {
      res.json({
        ok: false,
        message: results.rows[0].mensaje
      });
    }

  } catch (error) {
    res.json({
      ok: false,
      message:
        "Database connection error",
      error: error.stack
    });
  }
}

/**
 * 
 * @param {*} req This param is the request
 * @param {*} res This param is the response
 * This functions calls the instance of the database and send the data to an storage precedure that login 
 * an existing user
 */
async function usr_001_login(req, res) {
  try {
    const database = new Pool(req.database);
    let { userLogin, password } = req.body;
    // const encryptPass = hash.sha1(password);
    const query = "select * from public.auth_001_login($1,$2);";
    const results = await database.query(query, [userLogin, password]);
    await database.end();

    if (results.rows[0].ok) {
      let data = results.rows[0];
      res.status(200).json({
        ok: true,
        token: jwToken.createToken(data, req.database.id),
        data
      });
    } else {
      res.json({
        ok: false,
        message: results.rows[0].message
      });
    }

  } catch (error) {
    res.json({
      ok: false,
      message:
        "Database connection error",
      error: error.stack
    });
  }
}

/**
 * 
 * @param {*} req This param is the request
 * @param {*} res This param is the response
 * This functions calls the instance of the database and send the data to an storage precedure that logout the 
 * user from the application
 */
async function usr_001_logout(req, res) {
  try {
    const database = new Pool(req.database);
    const query = "select * from public.auth_001_logout($1);";
    const results = await database.query(query, [req.usr_login]);
    await database.end();

    if (results.rows[0].ok) {
      let data = results.rows[0];
      res.status(200).json({
        ok: true,
        data
      });
    } else {
      res.json({
        ok: false,
        message: results.rows[0].message
      });
    }

  } catch (error) {
    res.json({
      ok: false,
      message:
        "Database connection error",
      error: error.stack
    });
  }
}

module.exports = {
  usr_001_login,
  usr_001_logout,
  usr_001_register
};
