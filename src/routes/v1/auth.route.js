const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', validate(authValidation.logout), authController.logout);

module.exports = router;
