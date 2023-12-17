const express = require("express");
const app = express.Router();
const {
  handleURL,
  handleUrlAnalytics,
} = require("../controllers/url");
const url = require("../models/url");


app.route("/:id")
.get(handleURL);

app.get("/delete/:id",async (req,res)=>{
  const shortId = req.params.id;
  const deletedElement = await url.findOneAndDelete({shortId });
  return res.json(deletedElement);
})
app.route("/analytics/:id")
.get(handleUrlAnalytics);
module.exports = app;
