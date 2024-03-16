const express = require('express');
const product = require('./product.route');
const user=require('./login.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/products',
    route: product,
  },
  {
    path: '/user',
    route: user,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
