require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyJwt = function (req, res, next) {
  const token = req.headers["daveed-key"] || req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.json("We need token");
  } else {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({error: true, Message: "Not Authenticated"});
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJwt;