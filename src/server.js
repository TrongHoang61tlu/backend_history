import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
var cors = require('cors')
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
app.use(cors())
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8082;
app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is Running on  the port :" + port);
});
