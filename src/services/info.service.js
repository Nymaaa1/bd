const tadeService = require('./tade.service');

const getInfo = async (body) => {
    const contructionData = await tadeService.getContruction(body)
    return contructionData;
};

const createContructionsData = async (body) => {
    await tadeService.createContruction(body)
};

module.exports = {
    getInfo,
    createContructionsData
};
