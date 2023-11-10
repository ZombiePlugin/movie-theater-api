const express = require("express");
const app = express();
const User = require("../models/User");
const db = require("../db/connection");
const userRouter = require("../routes/users");
const showRouter = require("../routes/shows");

app.use("/users", userRouter);
app.use("/shows", showRouter);

module.exports = app;
