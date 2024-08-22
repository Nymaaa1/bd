const tadeService = require('./tade.service');

const getContructionsData = async (body) => {
    const contructionData = await tadeService.getContruction(body)
    return contructionData;
};

const createContructionsData = async (body) => {
    await tadeService.createContruction(body)
};

module.exports = {
    getContructionsData,
    createContructionsData
};
