const express = require('express');
const infoController = require('../../controllers/info.controller');
const router = express.Router();
const tokenService = require("../../token/token.check");

router.route("/").get(tokenService.checkToken, infoController.getInfo);

module.exports = router;
