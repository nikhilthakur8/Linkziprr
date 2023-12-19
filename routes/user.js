const express = require("express");
const router = express.Router();
const {
  handlePostUserSignUp,
  handlePostUserLogin,
} = require("../controllers/user.js");

router.route("/signup").post(handlePostUserSignUp);
router.route("/login").post(handlePostUserLogin);

router.get("/logout", (req, res) => {
  res.clearCookie("uid");
  return res.redirect("/user/login");
});
router.route("/signup").get(function (req, res) {
  if (req.user) return res.redirect("/");
  return res.render("signup");
});

router.route("/login").get(function (req, res) {
  if (req.user) return res.redirect("/");
  return res.render("login");
});

module.exports = router;
