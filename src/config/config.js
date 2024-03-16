const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().default('mongodb://localhost:27017'),
    JWTSECRET: Joi.string().default('APPUSER123'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt:{
    secret: envVars.JWTSECRET,
    accessTokenExpires:30,
    refreshTokenExpires:30
  },
  mongodbUrl:envVars.MONGODB_URL,
  tokens:{
    REFRESH:'REFRESH',
    RESET_PASSWORD:'RESET_PASSWORD',
    VERIFY_EMAIL:'VERIFY_EMAIL'
  },
  userTypes:{
    ADMIN:'ADMIN',
    APPUSER:'APPUSER'
  }
  
};
