const {Pool} = require("pg");
const hash = require("object-hash");
const jwToken = require("../../../service/jwt.service");
const logger = require('../../../modules/logger');


/**
 *
 * @param {*} req This param is the request
 * @param {*} res This param is the response
 * This functions calls the instance of the database and send the data to an storage precedure that register
 * a new user
 */
async function usr_001_register(req, res) {
    try {
        logger.log.info('Sing up: Starting process.');
        const database = new Pool(req.database);
        let {userLogin, password, email} = req.body;

        logger.log.debug('Sing up: User to register: ', [userLogin]);
        logger.log.debug('Sing up: Email to register: ', [email]);

        const query = "select * from public.auth_001_register($1,$2,$3);";

        logger.log.info('Sing up: Saving user into database.');
        const results = await database.query(query, [userLogin, email, password]);
        await database.end();

        if (results.rows[0].ok) {
            logger.log.info('Sing up: Process finished successfully.');
            let data = results.rows[0];
            res.status(200).json({
                ok: true,
                message: data.mensaje
            });
        } else {
            logger.log.error('Sing up: Failed trying to insert new user into database.');
            res.json({
                ok: false,
                message: results.rows[0].mensaje
            });
        }

    } catch (error) {
        logger.log.error('Sing up: Something went wrong, error:', [error.stack]);
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
        logger.log.info('Login: Starting process.');
        const database = new Pool(req.database);
        let {userLogin, password} = req.body;
        logger.log.debug('Login: User: ', [userLogin]);

        const encryptPass = hash.sha1(password);
        const query = "select * from public.auth_001_login($1,$2);";

        logger.log.info('Login: Database - validating user with password.');
        const results = await database.query(query, [userLogin, encryptPass]);
        await database.end();

        if (results.rows[0].ok) {
            logger.log.info('Login: Process finished successfully.');
            let data = results.rows[0];
            res.status(200).json({
                ok: true,
                token: jwToken.createToken(data, req.database.id),
                data
            });
        } else {
            logger.log.warn('Login: Username or password incorrect.');
            res.json({
                ok: false,
                message: results.rows[0].message
            });
        }

    } catch (error) {
        logger.log.error('Login: Something went wrong, error:', [error.stack]);
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
        logger.log.info('Log out: Starting process.');
        const database = new Pool(req.database);
        const query = "select * from public.auth_001_logout($1);";
        logger.log.debug('Log out: Logging out user: ', [userLogin]);
        const results = await database.query(query, [req.usr_login]);
        await database.end();

        if (results.rows[0].ok) {
            logger.log.info('Log out: Process finished successfully.');
            let data = results.rows[0];
            res.status(200).json({
                ok: true,
                data
            });
        } else {
            logger.log.warn('Log out: No user found.');
            res.json({
                ok: false,
                message: results.rows[0].message
            });
        }

    } catch (error) {
        logger.log.error('Log out: Something went wrong, error:', [error.stack]);
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
