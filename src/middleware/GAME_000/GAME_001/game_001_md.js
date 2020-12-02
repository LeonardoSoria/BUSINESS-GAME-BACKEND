/**
 * 
 * @param {*} req This param is the request 
 * @param {*} res This param is the respones
 * @param {*} next This param is the pass to the next step
 * 
 * In this function we validate the data from the frontend
 */
exports.game_001_answerQuestionM = function (req, res, next) {
    let { userLogin, level, building, answerId } = req.body;
    if (userLogin) {
        if (level) {
            if (building) {
                if (answerId) {
                    next();
                } else {
                    res.json({
                        ok: false,
                        message: "answerId required"
                    });
                }
            } else {
                res.json({
                    ok: false,
                    message: "building required"
                });
            }
        } else {
            res.json({
                ok: false,
                message: "level required"
            });
        }
    } else {
        res.json({
            ok: false,
            message: "userLogin required"
        });
    }
}