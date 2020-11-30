const express = require("express");
const app = express();

// cargar rutas
let USR_001 = require("./AUTH_001/usr_001.routes");

app.use("/auth_001", USR_001);


module.exports = app;
