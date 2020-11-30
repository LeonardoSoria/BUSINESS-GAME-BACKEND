const globalDB = require("../../../config/database.config");

exports.user_001_registerM = function (req, res, next) {
    let { userLogin, password, email } = req.body;
        if (userLogin) {
            if (password) {
                if (email) {
                    console.log(process.env.DB_ID);
                    const configDB = globalDB.find(
                        db => db.id === Number(process.env.DB_ID)
                    );
                    if (configDB === undefined) {
                        res.json({
                            ok: false,
                            message: "Database not found"
                        });
                    } else {
                        if (configDB.estado) {
                            req.database = configDB;
                            next();
                        } else {
                            res.json({
                                ok: false,
                                message: "Database not found"
                            });
                        }
                    }
                }
            } else {
                res.json({
                    ok: false,
                    message: "password required"
                });
            }
        } else {
            res.json({
                ok: false,
                message: "userLogin required"
            });
        }
}

exports.user_001_loginM = function (req, res, next) {
    let { userLogin, password } = req.body;
        if (userLogin) {
            if (password) {
                const configDB = globalDB.find(
                    db => db.id === Number(process.env.DB_ID)
                );
                if (configDB === undefined) {
                    res.json({
                        ok: false,
                        message: "Database not found"
                    });
                } else {
                    if (configDB.estado) {
                        req.database = configDB;
                        next();
                    } else {
                        res.json({
                            ok: false,
                            message: "Database not found"
                        });
                    }
                }
            } else {
                res.json({
                    ok: false,
                    message: "password is required"
                });
            }
        } else {
            res.json({
                ok: false,
                message: "userLogin is required"
            });
        }
}

