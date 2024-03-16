const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');


  const generateToken = (userId, expires, type) => {
    const secret = config.jwt.secret
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };



  const generateAuthTokens = (user) => {
    const accessTokenExpires = moment().add( config.jwt.accessTokenExpires, 'minutes');
    const accessToken = generateToken(user._id, accessTokenExpires, 'ACCESS');
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
    };
  };


  module.exports = {
    generateAuthTokens,
  };
  