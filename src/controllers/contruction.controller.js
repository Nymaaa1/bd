const catchAsync = require('../utils/catchAsync');
const { contructionService } = require('../services');

const getContructions = catchAsync(async (req, res) => {
    const data = ({ id: req.query.id, sCode: req.query.sCode });
    const constructions = await contructionService.getContructionsData(data);
    res.status(200).json({ data: constructions, status: "success", message: "Амжилттай", });
});

const createContructions = catchAsync(async (req, res) => {
    await contructionService.createContructionsData(req.body);
    res.status(200).json({ message: "Амжилттай хадгаллаа", status: "success" });
});

module.exports = {
    getContructions,
    createContructions
};
