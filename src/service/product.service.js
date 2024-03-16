const ApiError = require('../utils/ApiError');
const { cache } = require('./cacheService');
const { InventoryHelper } = require('./inventory.helper')
const { genRandom } = require('../utils/random');
const { CryptoCoin } = require('../models/index.js');



const getAll = async (payload) => {
  try{
    const inventoryHelper = new InventoryHelper()
    const { search, page, range } = payload;
    if (cache.product)
      return inventoryHelper.getPaginatedData(cache.product, search, page, range)
    const productsData = await CryptoCoin.find({})
    cache.product = {
      data: productsData,
      searchNode: inventoryHelper.addToSearchTree(productsData)
    };
    return inventoryHelper.getPaginatedData(cache.product, search, page, range)
  }
  catch(err){
    throw new ApiError(400,err.message)
  } 
};




const createCoin = async (payload) => {
  try{
  payload.coinId = genRandom(payload.code.toUpperCase().substr(0, 3), payload.name.length);
  await CryptoCoin.create(payload);
  cache.product = false;
  return {
    success: true,
    message: 'Coin Created'
  };
}
  catch(err){
    throw new ApiError(400,err.message)
  } 
};


const updateCoin = async (payload) => {
  try{
  await CryptoCoin.updateOne({ coinId: payload.coinId }, { $set: { ...payload } });
  cache.product = false;
  return {
    success: true,
    message: 'Coin Updated'
  };
}
  catch(err){
    throw new ApiError(400,err.message)
  } 
};


const deleteCoin = async (payload) => {
  try{
  await CryptoCoin.deleteOne({ coinId: payload.coinId });
  cache.product = false;
  return {
    success: true,
    message: 'Coin Deleted'
  };
}
  catch(err){
    throw new ApiError(400,err.message)
  } 
};




module.exports = {
  getAll, createCoin, updateCoin, deleteCoin
};
