const catchAsync = require('../utils/catchAsync');
const multer = require("multer");
const path = require("path");
const { orderService } = require('../services');

const getOrder = catchAsync(async (req, res) => {
    const data = ({ id: req.query.id, sCode: req.query.sCode, cCode: req.query.cCode, page: req.query.page });
    const { orders, pageInfo } = await orderService.getOrderData(data);
    res.status(200).json({ data: orders, pageInfo: pageInfo, status: "success", message: "Амжилттай" });
});

const createOrder = catchAsync(async (req, res) => {
    console.log(req.body);
    console.log("here right");
    await orderService.createOrderData(req.body);
    res.status(200).json({ message: "Амжилттай хадгаллаа", status: "success" });
});

const editOrder = catchAsync(async (req, res) => {
    const requestData = req.body;
    try {
        for (let i = 0; i < requestData.length; i++) {
            if (requestData[i].count > requestData[i].wayCount && requestData[i].wayCount > 0) {
                var orderData = {
                    name: requestData[i].name,
                    size: requestData[i].size,
                    count: requestData[i].count,
                    wayCount: requestData[i].wayCount,
                    price: requestData[i].price,
                    allPrice: requestData[i].allPrice,
                    dollar: requestData[i].dollar,
                    allDollar: requestData[i].allDollar,
                    imageUrl: requestData[i].imageUrl,
                    orderDate: formatDate(requestData[i].orderDate),
                    type: 1,
                    id: requestData[i].id,
                    sCode: requestData[i].sCode,
                    cCode: requestData[i].cCode,
                    oCode: requestData[i].oCode
                };
                await orderService.editOrderData(orderData);
            } else if (requestData[i].count <= requestData[i].wayCount) {
                var orderData = {
                    name: requestData[i].name,
                    size: requestData[i].size,
                    count: requestData[i].count,
                    wayCount: requestData[i].wayCount,
                    price: requestData[i].price,
                    allPrice: requestData[i].allPrice,
                    dollar: requestData[i].dollar,
                    allDollar: requestData[i].allDollar,
                    imageUrl: requestData[i].imageUrl,
                    orderDate: formatDate(requestData[i].orderDate),
                    type: 2,
                    id: requestData[i].id,
                    sCode: requestData[i].sCode,
                    cCode: requestData[i].cCode,
                    oCode: requestData[i].oCode
                };
                await orderService.editOrderData(orderData);
            } else if (requestData[i].wayCount == 0) {
                var orderData = {
                    name: requestData[i].name,
                    size: requestData[i].size,
                    count: requestData[i].count,
                    wayCount: requestData[i].wayCount,
                    price: requestData[i].price,
                    allPrice: requestData[i].allPrice,
                    dollar: requestData[i].dollar,
                    allDollar: requestData[i].allDollar,
                    imageUrl: requestData[i].imageUrl,
                    orderDate: formatDate(requestData[i].orderDate),
                    type: 0,
                    id: requestData[i].id,
                    sCode: requestData[i].sCode,
                    cCode: requestData[i].cCode,
                    oCode: requestData[i].oCode
                };
                await orderService.editOrderData(orderData);
            }
            else {
                var orderData = {
                    name: requestData[i].name,
                    size: requestData[i].size,
                    count: requestData[i].count,
                    wayCount: requestData[i].wayCount,
                    price: requestData[i].price,
                    allPrice: requestData[i].allPrice,
                    dollar: requestData[i].dollar,
                    allDollar: requestData[i].allDollar,
                    imageUrl: requestData[i].imageUrl,
                    orderDate: formatDate(requestData[i].orderDate),
                    type: requestData[i].type,
                    id: requestData[i].id,
                    sCode: requestData[i].sCode,
                    cCode: requestData[i].cCode,
                    oCode: requestData[i].oCode
                };
                await orderService.editOrderData(orderData);
            }
        }
    }
    catch (error) {
        console.log(error)
    }
    res.status(200).json({ message: "Амжилттай засагдлаа", status: "success" });
    // type = 0 shine zahialga
    // type = 1 count > wayCount (dutuu baraa avj ogson)
    // type = 2 count <= wayCount (zahialga bolson)
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
        }
        cb(null, true);
    },
});

const uploadImage = catchAsync(async (req, res) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', status: 'error' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', status: 'error' });
            }
            await orderService.createImageName(req);
            res.status(200).json({ message: 'Image uploaded successfully', status: 'success' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
});

function formatDate(date) {
    const dates = new Date(date);
    const year = dates.getFullYear();
    const month = String(dates.getMonth() + 1).padStart(2, '0');
    const day = String(dates.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
}

module.exports = {
    getOrder,
    createOrder,
    editOrder,
    uploadImage
};
