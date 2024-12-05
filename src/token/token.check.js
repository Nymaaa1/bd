const jwt = require('jsonwebtoken');
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const ApiError = require('../utils/ApiError');

const checkToken = catchAsync(async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = await req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ status: "error", message: 'Гараад дахин нэвтэрнэ үү' });
        const decoded = jwt.decode(token.replace('Bearer ', ''), "Biydaalt");
        const userData = await userService.getUserByEmail(decoded.email);
        if (decoded.password != userData.password) return res.status(401).json({ status: "error", message: 'Гараад дахин нэвтэрнэ үү' });
        const now = Date.now();
        const twelveHoursLater = (now + (12 * 60 * 60)) / 1000;
        if (decoded.exp < twelveHoursLater) return res.status(401).json({ status: "error", message: 'Хугацаа дууссан гараад дахин нэвтэрнэ үү' });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: "error", message: 'Гараад дахин нэвтэрнэ үү' });
    }
});

const refreshToken = async (user) => {
    try {
        const token = jwt.sign({
            name: user.firstname,
            password: user.password,
            email: user.email,
            phone: user.lastname
        }, 'Biydaalt', {
            expiresIn: '12h'
        });
        await userService.refreshUserToken(user, token);
        return token;
    } catch (error) {
        new ApiError(httpStatus.BAD_REQUEST, 'Токен хөрвүүлэх алдаа!');
    }
};


module.exports = {
    checkToken,
    refreshToken
};


