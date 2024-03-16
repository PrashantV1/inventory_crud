const { serviceHandler } = require('../utils/ServiceHandler');
const {getAll,createCoin,updateCoin,deleteCoin} =require('../service/product.service');

const getCoinData=async(req,res)=>{
    const products =  getAll(req.body)
    serviceHandler(req,res,Promise.resolve(products));
};




const insertCoin=async(req,res)=>{
    const products =  createCoin(req.body)
    serviceHandler(req,res,Promise.resolve(products));
};


const updateCoinData=async(req,res)=>{
    const products =  updateCoin(req.body)
    serviceHandler(req,res,Promise.resolve(products));
};

const deleteCoinData=async(req,res)=>{
    const products =  deleteCoin(req.body)
    serviceHandler(req,res,Promise.resolve(products));
};



module.exports = {
    getCoinData,insertCoin,updateCoinData,deleteCoinData
};
