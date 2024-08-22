const express = require('express');
const contructionController = require('../../controllers/contruction.controller');
const router = express.Router();
const tokenService = require("../../token/token.check");
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');

router.route("/").get(tokenService.checkToken, contructionController.getContructions).post(tokenService.checkToken, validate(authValidation.contruction), contructionController.createContructions);

module.exports = router;
