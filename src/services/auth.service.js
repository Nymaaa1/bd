const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const createUser = async (userBody) => {
    return userService.createUser(userBody);
};

const loginUserWithEmailAndPassword = async (email, password) => {
    const userData = await userService.getUserByEmail(email);
    if (!userData) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Емэйл бүртгэлгүй байна!');
    }
    if (password != userData.password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Нууц үг буруу!');
    }
    return userData;
};


// const logout = async (refreshToken) => {
//     const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
//     if (!refreshTokenDoc) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
//     }
//     await refreshTokenDoc.remove();
// };

module.exports = {
    loginUserWithEmailAndPassword,
    createUser
    // logout,
};
