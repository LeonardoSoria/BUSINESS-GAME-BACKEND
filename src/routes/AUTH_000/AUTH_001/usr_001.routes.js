const express = require("express");
const router = express.Router();
const mdAuth = require("../../../middleware/authentication.middleware")

const AUTH_001_MD = require("../../../middleware/AUTH_000/AUTH_001/auth_001_md");
const AUTH_001_CTRL = require("../../../controller/AUTH_000/AUTH_001/auth_001_ctrl");

router.post("/register", [AUTH_001_MD.user_001_registerM], AUTH_001_CTRL.usr_001_register);

router.post("/login", [AUTH_001_MD.user_001_loginM], AUTH_001_CTRL.usr_001_login);

router.post("/logout", [mdAuth.ensureAuth], AUTH_001_CTRL.usr_001_logout);

module.exports = router;
