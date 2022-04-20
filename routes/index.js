const express = require("express");
const GenderController = require("../controllers/gender.controller");
const routes = express.Router();

routes.get("/gender", GenderController.listar);

module.exports = routes;

