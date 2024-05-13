const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.listen(3000, () => {
  console.log("Server running")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('view'));

const staticRouter = require('./routes/staticRoutes')
app.use(staticRouter);

const userRouter = require('./routes/userRoutes')
app.use(userRouter);

const deviceRouter = require('./routes/deviceRoutes')
app.use(deviceRouter);

const dashboardRouter = require("./routes/dashboardRoutes")
app.use(dashboardRouter);