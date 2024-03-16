const express = require('express');
const { userController } = require('../controllers');
const {    signUpBody,loginBody} =require('../middleware/bodyValidator')
const {validate}=require('../middleware/validator');

const router = express.Router();

router
.route('/signup')
.post(validate(signUpBody),userController.createUser);

router
  .route('/login')
  .post(validate(loginBody),userController.loginUser);





module.exports = router;
