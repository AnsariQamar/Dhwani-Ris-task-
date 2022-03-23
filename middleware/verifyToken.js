let jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/SECRET");

module.exports = function (req, res, next) {
  let token = req.headers.token;
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          status: 401,
          message: "Wrong number of segments",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).send({
      success: false,
      status: 400,
      message: "token is required",
    });
  }
};
