const express = require("express");
const app = express();

// cargar rutas
let GAME_001 = require("./GAME_001/game_001.routes");

app.use("/game_001", GAME_001);


module.exports = app;