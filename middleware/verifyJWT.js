const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // take a data from request header
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.userInfo.username; // this line decodes the username we sent by token and put it on req
    req.roles = decoded.userInfo.roles
    console.log("jwt verified");
    next();
  });
};
 
module.exports = verifyJWT;
