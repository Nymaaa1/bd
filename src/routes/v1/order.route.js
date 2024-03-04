const express = require('express');
const orderController = require('../../controllers/order.controller');
const router = express.Router();
const tokenService = require("../../token/token.check");

router.route("/").get(tokenService.checkToken, orderController.getOrder).post(tokenService.checkToken, orderController.createOrder);
router.route("/edit").post(tokenService.checkToken, orderController.editOrder);
router.route("/imageUpload").post(tokenService.checkToken, orderController.uploadImage);

module.exports = router;
