const express = require("express");
const router = express.Router();
const {
  handlePostUserSignUp,
  handlePostUserLogin,
} = require("../controllers/user.js");

router.route("/signup").post(handlePostUserSignUp);
router.route("/login").post(handlePostUserLogin);

module.exports = router;
