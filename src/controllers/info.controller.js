const catchAsync = require('../utils/catchAsync');
const { infoService } = require('../services');

const getInfo = catchAsync(async (req, res) => {
    const constructions = await infoService.getInfo(data);
    res.status(200).json({ data: constructions, status: "success", message: "Амжилттай", });
});

const createContructions = catchAsync(async (req, res) => {
    await infoService.createContructionsData(req.body);
    res.status(200).json({ message: "Амжилттай хадгаллаа", status: "success" });
});

module.exports = {
    getInfo,
    createContructions
};
