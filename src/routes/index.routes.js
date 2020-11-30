const express = require("express");
const app = express();
const md_auth = require("../middleware/authentication.middleware");

let USR_000 = require("./AUTH_000/index.routes");
// let ADM_000 = require("./ADM_000/index.routes");
// let REP_000 = require("./REP_000/index.routes")


app.use("/auth_000", USR_000);
// app.use("/adm_000", [md_auth.ensureAuth], ADM_000);
// app.use("/rep_000", [md_auth.ensureAuth], REP_000);


module.exports = app;
