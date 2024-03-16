const express = require('express');
const {productController } = require('../controllers');
const {authenticateUser} =require('../middleware/authMiddleWare');
const {  deleteDataBody,  addDataBody,searchDataBody,updateData} =require('../middleware/bodyValidator')
const {validate}=require('../middleware/validator');


const router = express.Router();



router
  .route('/')
  .post(validate(searchDataBody),authenticateUser,productController.getCoinData);

  router
  .route('/')
  .put(validate(updateData),authenticateUser,productController.updateCoinData);

  router
  .route('/add')
  .post(validate(addDataBody),authenticateUser,productController.insertCoin);

  router
  .route('/delete')
  .post(validate(deleteDataBody),authenticateUser,productController.deleteCoinData);






module.exports = router;
