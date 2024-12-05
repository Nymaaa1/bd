const express = require('express');
const infoController = require('../../controllers/info.controller');
const router = express.Router();
// const tokenService = require("../../token/token.check");

router.route("/").get(infoController.getInfo);
router.route("/dasgal").get(infoController.getDasgal);
router.route("/link").get(infoController.getLink);

module.exports = router;
