const orderService = require('./orderDetial.service');

const getOrderData = async (data) => {
    const {orders, pageInfo} = await orderService.getOrder(data);
    return {orders, pageInfo};
};

const createOrderData = async (body) => {
    await orderService.createOrder(body);
};

const editOrderData = async (body) => {
    await orderService.editOrder(body);
};

const createImageName = async (body) => {
    await orderService.uploadImageName(body);
};

module.exports = {
    getOrderData,
    createOrderData,
    editOrderData,
    createImageName
};
