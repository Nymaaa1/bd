const jwt = require('jsonwebtoken');
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const ApiError = require('../utils/ApiError');

const checkToken = catchAsync(async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ status: "error", message: 'Токен алга' });
        const decoded = jwt.decode(token.replace('Bearer ', ''), "TadeContruction19Token");
        const userData = await userService.getUserByEmail(decoded.email);
        if (req.password === userData.password) return res.status(401).json({ status: "error", message: 'Токен алга' });
        const now = Date.now();
        const twelveHoursLater = (now + (12 * 60 * 60)) / 1000;
        if (decoded.exp < twelveHoursLater) return res.status(401).json({ status: "error", message: 'Хугацаа дууссан гараад дахин нэвтэрнэ үү' });
        next();
    } catch (error) {
        res.status(401).json({ status: "error", message: 'Хүчинтэй токен биш' });
    }
});

const refreshToken = async (user) => {
    try {
        const token = jwt.sign({
            image: user.image,
            name: user.name,
            password: user.password,
            role: user.role,
            email: user.email,
            phone: user.phone
        }, 'TadeContruction19Token', {
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


