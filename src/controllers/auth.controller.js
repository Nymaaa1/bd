const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');
const bcrypt = require('bcryptjs');
const tokenService = require('../token/token.check');
const logger = require('../config/logger');

const register = catchAsync(async (req, res) => {
    if (req.body.myToken !== "TadeContruction") {
        logger.error("Шинэ хэрэглэгч үүсгэх гэж оролдлоо!!!");
        res.status(400).json({ status: "error", message: "Хамгаалалт!" });
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await authService.createUser(req.body);
        res.status(httpStatus.CREATED).json({ data: user, message: "Амжилттай", status: "success" });
    }
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenService.refreshToken(user);
    user.token = token;
    res.status(httpStatus.CREATED).json({ data: user, message: "Амжилттай", status: "success" });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).json();
});

module.exports = {
    login,
    logout,
    register
};
