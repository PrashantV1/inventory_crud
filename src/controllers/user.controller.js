const {  userService } = require('../service');
const { serviceHandler } = require('../utils/ServiceHandler');


const createUser=async(req,res)=>{
    const userBody=req.body;
    const user =  userService.createUser(userBody)
    serviceHandler(req,res,Promise.resolve(user));
};

const loginUser=async(req,res)=>{
    const user =  userService.loginUser(req.body)
    serviceHandler(req,res,Promise.resolve(user));
};




module.exports = {
    createUser,loginUser
};
