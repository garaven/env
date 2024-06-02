// External Modules.
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Express server configuration.
app.listen(3000, () => {
  console.log("Server running")
});

//Middlewares.
app.use(bodyParser.urlencoded({ extended: true })); // To analize URL body requests.
app.use(bodyParser.json()); // To analize JSON requests.
app.use(express.static('view')); // To use static files from view folder.

// Main Routers.
const staticRouter = require('./routes/staticRoutes')
app.use(staticRouter);

const userRouter = require('./routes/userRoutes')
app.use(userRouter);

const deviceRouter = require('./routes/deviceRoutes')
app.use(deviceRouter);

const dashboardRouter = require("./routes/dashboardRoutes")
app.use(dashboardRouter);

const deviceData = require("./routes/deviceData")
app.use(deviceData);