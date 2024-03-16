const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const coinSchema = mongoose.Schema(
  {
    coinId:{
        type:String,
        required:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: String,
        required: true,
      },
      origin: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
coinSchema.plugin(toJSON);


const CryptoCoin = mongoose.model('CryptoCoin', coinSchema);

module.exports = CryptoCoin;
