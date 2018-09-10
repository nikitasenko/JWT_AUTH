const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'superSECRETKey';

const checkJWT = expressJwt({
  secret: JWT_SECRET
});

function getJwtToken(userInfo) {
  return jwt.sign(userInfo, JWT_SECRET);
}

module.exports = [checkJWT, getJwtToken];
