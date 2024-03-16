const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const passwordSchema = mongoose.Schema(
  {
    salt:{
        type:String
    },
    password:{
        type:String
    }
});



passwordSchema.plugin(toJSON);




const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
