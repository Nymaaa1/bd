const knex = require('knex')(require("../knex"));

const getContruction = async (body) => {
    const res = {
        kal: 1227,
        dutuu: 1503,
        nuursus: 123,
        uurag: 40,
        ooh: 50,
        water: 2100,
        last: [
            {
                name: "Breakfast",
                desc: "",
                kal: "525"
            },
            {
                name: "Lunch",
                desc: "",
                kal: "450"
            },
            {
                name: "Snack",
                desc: "",
                kal: "602"
            }
        ]
    }
    return res;
};

const getDasgal = async () => {
    return contructions = await knex.select('*').from('dasgal');
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
    getDasgal,
    createContruction
};
