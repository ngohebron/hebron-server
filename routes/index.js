const express = require('express');
const router = express.Router();
const eventRoute = require('./eventRoutes');
const donorRoute = require('./donorRoute');
const donationRoute = require('./donationRoute');
const adminRoute = require('./adminRoute');


const defaultRoutes = [
    {
        path: "/event",
        route:eventRoute
    },
    {
      path:"/donor",
      route:donorRoute
    },
     {
      path:"/donation",
      route:donationRoute
    },
    {
      path:"/admin",
      route:adminRoute
    }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;