const Joi = require('joi');


 const signUpSchema={
    email: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
}


 const loginSchema={
    email: Joi.string().required(),
    password: Joi.string().required(),
}



const AddDataSchema={
    name: Joi.string().required(),
    currency: Joi.string().required(),
    price: Joi.string().required(),
    origin: Joi.string().required(),
    code: Joi.string().required(),
}

const DeleteSchema={
    coinId: Joi.string().required(),
}


const getDataSchema={
    search: Joi.string().allow("").required(),
    page: Joi.number().required(),
    range: Joi.number().required(),
}


const signUpBody = { body: signUpSchema};
const loginBody = { body: loginSchema};

const searchDataBody={ body:getDataSchema}

const addDataBody={ body:AddDataSchema}
const updateData={ body:{...AddDataSchema,coinId:Joi.string().required()}}

const deleteDataBody={ body:DeleteSchema}


module.exports={
    signUpBody,loginBody,addDataBody,deleteDataBody,searchDataBody,updateData
}


