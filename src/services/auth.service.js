const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const createUser = async (userBody) => {
    if (await userService.getUserByEmail(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Емэйл бүртгэлтэй!');
    }
    return userService.createUser(userBody);
};

const loginUserWithEmailAndPassword = async (email, password) => {
    if (!(await userService.getUserByEmail(email))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Емэйл бүртгэлгүй байна!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Нууц үг буруу!');
    }
    return user;
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
