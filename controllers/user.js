// const { v4: uuidv4 } = require("uuid");
const user = require("../models/user.js");
const { getUser, setUser } = require("../service/auth.js");
async function handlePostUserSignUp(req, res) {
  const { name, email, password } = req.body;
  const entry = await user.create({
    name,
    email,
    password,
  });
  // console.log(entry);
  const token = setUser(entry);
  return res.cookie("uid", token).redirect("/");
}

async function handlePostUserLogin(req, res) {
  const { email, password } = req.body;
  const entry = await user.findOne({
    email: email.toLowerCase(),
    password,
  });
  if (!entry) return res.render("login", {error:"Error: Incorrect Email or Password "});
  const token = setUser(entry);
  return res.cookie("uid", token).redirect("/");
}
module.exports = { handlePostUserSignUp, handlePostUserLogin };
