const express = require('express');
const router = express.Router();
const eventRoute = require('./eventRoutes');


const defaultRoutes = [
    {
        path: "/event",
        route:eventRoute
    },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;