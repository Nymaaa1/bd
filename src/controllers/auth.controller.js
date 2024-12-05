const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');
const bcrypt = require('bcryptjs');
const tokenService = require('../token/token.check');
const logger = require('../config/logger');

const register = catchAsync(async (req, res) => {
    console.log(req.body);
    const user = await authService.createUser(req.body);
    res.status(httpStatus.CREATED).json({ data: user, message: "Амжилттай", status: 0 });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenService.refreshToken(user);
    user.token = token;
    console.log(user);
    res.status(httpStatus.CREATED).json({ data: user, message: "Амжилттай", status: 1 });
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
