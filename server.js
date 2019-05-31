const express = require("express");
const server = express();
const actionModelRouter = require("./data/helpers/actionModel-router.js");
server.use(express.json());


server.use("/api/actions", actionModelRouter);

module.exports = server;