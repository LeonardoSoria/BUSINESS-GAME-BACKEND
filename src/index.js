let compression = require("compression");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
let server = http.createServer(app);
let cors = require("cors");
let fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

// Import the logger
const logger = require('./modules/logger');

require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set("port", process.env.PORT || 5000);

/**
 * Here we set the headers for the CORS problems
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(logger.express);

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors({origin: true, credentials: true}));

app.use(require(path.join(__dirname, 'routes/index.routes')));

module.exports.io = socketIO(server);
require("./socket/socket.socket");

server.listen(app.get("port"), () => {
    //console.log("running");
});
