const catchAsync = require('../utils/catchAsync');
const { infoService } = require('../services');

const getInfo = catchAsync(async (req, res) => {
    const constructions = await infoService.getMeals();
    const ress = {
        kal: 1227,
        dutuu: 1503,
        nuursus: 123,
        uurag: 40,
        ooh: 50,
        water: 2100,
        last: [
            constructions
        ]
    }
    res.status(200).json({ data: ress, status: "success", message: "Амжилттай", });
});

const getDasgal = catchAsync(async (req, res) => {
    const constructions = await infoService.getDasgal();
    res.status(200).json({ data: constructions, status: "success", message: "Амжилттай", });
});

const getLink = catchAsync(async (req, res) => {
    const constructions = await infoService.getDasgal();
    res.status(200).json({ data: constructions, status: "success", message: "Амжилттай", });
});

const createContructions = catchAsync(async (req, res) => {
    await infoService.createContructionsData(req.body);
    res.status(200).json({ message: "Амжилттай хадгаллаа", status: "success" });
});

module.exports = {
    getInfo,
    getDasgal,
    getLink,
    createContructions
};
