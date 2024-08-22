const express = require('express');
const order = require("./order.route");
const authRoute = require('./auth.route');
const contruction = require('./contruction.route');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/contruction',
        route: contruction,
    },
    {
        path: '/order',
        route: order,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
