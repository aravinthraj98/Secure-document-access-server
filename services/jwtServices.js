const jwt = require('jsonwebtoken');
const secret = 'aravinth';
function generateToken(data) {
  let token = jwt.sign(data, secret);
  return token;
}
function verifyToken(data){
  let token = jwt.verify(data,secret);
  return token;
}

module.exports = { generateToken,verifyToken };
