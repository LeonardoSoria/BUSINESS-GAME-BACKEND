const express = require("express");
const router = express.Router();
const mdAuth = require("../../../middleware/authentication.middleware")

const GAME_001_MD = require("../../../middleware/GAME_000/GAME_001/game_001_md");
const GAME_001_CTRL = require("../../../controller/GAME_000/GAME_001/game_001_ctrl");

/**
 * These are the endpoints that have routes, middlewares and controllers
 */
router.post("/answerQuestions", [GAME_001_MD.game_001_answerQuestionM], GAME_001_CTRL.game_001_answerQuestion);

router.get("/getQuestions/:user", GAME_001_CTRL.game_001_getQuestions);

module.exports = router;