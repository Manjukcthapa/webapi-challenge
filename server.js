const express = require("express");
const server = express();
const actionModelRouter = require("./data/helpers/actionModel-router.js");
const projectModelRouter = require("./data/helpers/projectModel-router.js");

server.use(express.json());

server.use("/api/actions", actionModelRouter);
server.use("/api/projects", projectModelRouter);

module.exports = server;