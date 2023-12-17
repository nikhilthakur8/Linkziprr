const jwt = require("jsonwebtoken");
const secretKey = "Nikhil$12??s21";
function setUser(user) {
  user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  return jwt.sign(user, secretKey);
}

function getUser(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
