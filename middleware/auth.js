const { getUser } = require("../service/auth");

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUId = req.cookies?.uid;
//   const user = getUser(userUId);
//   if (!userUId || !user) res.redirect("/login");
//   else {
//     req.user = user;
//     next();
//   }
// }
function checkForAuthentication(req, res, next) {
  const token = req.cookies?.uid;
  req.user = null;
  if (!token) return next();
  const user = getUser(token);
  req.user = user;
  next();
}
// async function checkAuth(req, res, next) {
//   if (req.cookies?.uid) {
//     const token = req.cookies?.uid;
//     const user = getUser(token);
//     req.user = user;
//   }
//   next();
// }
function restrictTo(role) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("user/login");
    if (!role.includes(req.user.role))
      return res.send(`<h1 style="font-size:50px;color:#cc0000">You have not authorisation to access this route<h1>`);
    next();
  };
}
module.exports = {
  checkForAuthentication,
  restrictTo,
  // restrictToLoggedInUserOnly,
  // checkAuth,
};
