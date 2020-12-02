const express = require("express");
const app = express();
const md_auth = require("../middleware/authentication.middleware");

let USR_000 = require("./AUTH_000/index.routes");
let GAME_000 = require("./GAME_000/index.routes");


app.use("/auth_000", USR_000);
app.use("/game_000", [md_auth.ensureAuth], GAME_000);


module.exports = app;
