const { Pool } = require("pg");

/**
 * 
 * @param {*} req This param is the request
 * @param {*} res This param is the response
 * This functions calls the instance of the database and send the data to an storage precedure that get the questions
 * of an especific user
 * 
 */
async function game_001_getQuestions(req, res) {
    try {
        const database = new Pool(req.database);
        let { user } = req.params;
        const query = "select * from public.game_001_getQuestions($1);";
        const results = await database.query(query, [user]);
        await database.end();

        if (results.rowCount > 0) {
            let data = results.rows
            res.status(200).json({
                ok: true,
                data
            });
        } else {
            res.json({
                ok: false,
                message: "No se encontraron datos"
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
 * This functions calls the instance of the database and send the data to an storage precedure that answer
 * one of the questions that belongs to an especific user
 */
async function game_001_answerQuestion(req, res) {
    try {
        const database = new Pool(req.database);
        let { userLogin, level, building, answerId } = req.body;
        const query = "select * from public.game_001_answerQuestion($1,$2,$3,$4);";
        const results = await database.query(query, [userLogin, level, building, answerId]);
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
    game_001_getQuestions,
    game_001_answerQuestion
};