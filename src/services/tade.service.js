const knex = require('knex')(require("../knex"));

const getContruction = async (body) => {
    return contructions = await knex.select('*').from('Contruction').where({
        id: body.id,
        sCode: body.sCode
    });
};
const createContruction = async (body) => {
    await knex('Contruction').insert({
        name: body.name,
        type: body.type,
        id: body.id,
        sCode: body.sCode
    });
};

module.exports = {
    getContruction,
    createContruction
};
