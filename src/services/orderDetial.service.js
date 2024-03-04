const knex = require('knex')(require("../knex"));

const getOrder = async (body) => {
    try {
        const { page } = body;
        const pageSize = 20;
        const offset = (page - 1) * pageSize;

        const allOrders = await knex
            .count('* as totalCount')
            .from('Orders')
            .where({
                id: body.id,
                sCode: body.sCode,
                cCode: body.cCode
            });

        const totalCount = allOrders[0].totalCount;

        const orders = await knex
            .select('*')
            .from('Orders')
            .where({
                id: body.id,
                sCode: body.sCode,
                cCode: body.cCode
            })
            .orderBy('orderDate', 'desc')
            .limit(pageSize)
            .offset(offset);

        const totalPages = Math.ceil(totalCount / pageSize);
        return {
            orders,
            pageInfo: {
                currentPage: page,
                pageSize,
                totalPages
            }
        };
    } catch (e) {
        console.log(e)
    }


};



const createOrder = async (body) => {
    await knex('Orders').insert({
        name: body.name,
        size: body.size,
        count: body.count,
        wayCount: body.wayCount,
        price: body.price,
        allPrice: body.allPrice,
        dollar: body.dollar,
        allDollar: body.allDollar,
        imageUrl: body.imageUrl,
        orderDate: body.orderDate,
        type: body.type,
        id: body.id,
        sCode: body.sCode,
        cCode: body.cCode
    });
};

const editOrder = async (body) => {
    await knex('Orders')
        .where({ id: body.id, sCode: body.sCode, cCode: body.cCode, oCode: body.oCode })
        .update({
            name: body.name,
            size: body.size,
            count: body.count,
            wayCount: body.wayCount,
            price: body.price,
            allPrice: body.allPrice,
            dollar: body.dollar,
            allDollar: body.allDollar,
            imageUrl: body.imageUrl,
            orderDate: body.orderDate,
            type: body.type,
        });
};

const uploadImageName = async (req) => {
    var data = req.body;
    data["image"] = req.file.filename;
    await knex('Orders')
        .where({ id: data.id, sCode: data.sCode, cCode: data.cCode, oCode: data.oCode })
        .update({ imageUrl: data.image, });
};

module.exports = {
    getOrder,
    createOrder,
    editOrder,
    uploadImageName
};
