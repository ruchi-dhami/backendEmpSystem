var jwt = require("jsonwebtoken"); // importing jsonweb token for generate token
const secretkey = "seebiz"; /// my secret key to protect
exports.Logged = (req, res, next) => {
  if (req.headers && req.headers.token) {
    let decoded = jwt.verify(req.headers.token, secretkey);
    console.log(decoded);
    req.email = decoded.email;
    next();
  } else {
    res.status(401).json({
      message: "decoded not happen",
    });
  }
};
