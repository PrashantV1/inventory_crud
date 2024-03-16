
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models/index.js');
const { ExtractJwt } = require('passport-jwt');


const  verifyToken = (req, res, next) => {
    const token =ExtractJwt.fromAuthHeaderAsBearerToken()(req); ;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token,config.jwt.secret,async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      const userSub = {_id:decoded.sub};
        const user= await User.findOne(userSub);
        if(!user)
        return res.status(401).json({ error: 'Invalid User Token' });
        req.user=user;
      next();
    });
  };


  module.exports.authenticateUser=verifyToken;