const jwt = require("jsonwebtoken");

exports.signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
   
  );
};

exports.verifyToken = (token) => {
  // Throws if the signature is invalid or the token is expired
  return jwt.verify(token, process.env.JWT_SECRET);
};