const tadeService = require('./tade.service');

const getInfo = async (body) => {
    const contructionData = await tadeService.getContruction(body)
    return contructionData;
};

const getDasgal = async () => {
    const contructionData = await tadeService.getDasgal();
    return contructionData;
};

const createContructionsData = async (body) => {
    await tadeService.createContruction(body)
};

module.exports = {
    getInfo,
    getDasgal,
    createContructionsData
};
