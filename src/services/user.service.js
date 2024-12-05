const knex = require('knex')(require("../knex"));

const getUserByEmail = async (email) => {
    return await knex('user').where('email', email).first();
};

const createUser = async (body) => {
    try {
        return await knex('user').insert({
            firstname: body.firstname,
            lastname: body.lastname,
            password: body.password,
            email: body.email,
            token: "",
            isAdmin: false
        });
    } catch (e) {
        console.log(e);
    }
};

const refreshUserToken = async (user, token) => {
    await knex('user')
        .where({ email: user.email, password: user.password }).update({ token: token });
};

module.exports = {
    getUserByEmail,
    createUser,
    refreshUserToken
};
