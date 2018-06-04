"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
exports.config = {
    database: 'mongodb://localhost:27017/devDB',
};
// Connect mongoose to our database
mongoose.connect(exports.config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('CONNECTED!');
    // we're connected!
});
// Declaring Port
const port = 3000;
// Initialize our app variable
const app = express();
// Middleware for CORS
app.use(cors());
// Middlewares for bodyparsincorsg using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny')); // 'combined for more info'
/*express.static is a built i"n middleware function to serve static files.
We are telling express server public folder is the place to look for the static files */
app.use(express.static(path.join(__dirname, 'public')));
// initRouting(app);
// Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
console.log('hello world');
//# sourceMappingURL=index.js.map