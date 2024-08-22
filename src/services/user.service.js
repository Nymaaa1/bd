const knex = require('knex')(require("../knex"));
const jwt = require('jsonwebtoken');

const getUserByEmail = async (email) => {
    return await knex('users').where('email', email).first();
};

const createUser = async (body) => {
    const token = jwt.sign({
        image: body.image,
        name: body.name,
        password: body.password,
        role: body.role,
        email: body.email,
        phone: body.phone
    }, 'TadeContruction19Token', {
        expiresIn: '12h'
    });
    const [userId] = await knex('users').insert({
        image: body.image,
        name: body.name,
        password: body.password,
        role: body.role,
        email: body.email,
        phone: body.phone,
        token: token
    });
    const newUser = await knex('users').where('id', userId).first();
    return newUser;
};

const refreshUserToken = async (user, token) => {
    await knex('users')
        .where({ email: user.email, password: user.password }).update({ token: token });
};

module.exports = {
    getUserByEmail,
    createUser,
    refreshUserToken
};
