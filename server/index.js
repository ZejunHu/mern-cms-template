// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//DB Setup
mongoose.connect(
  "mongodb://admin:admin1234@ds137230.mlab.com:37230/mern-cms-template"
);

// App Setup
app.use(morgan("combined")); // morgan is used to log incoming request
app.use(cors());
app.use(bodyParser.json({ type: "*/*" })); // parse request as json
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
