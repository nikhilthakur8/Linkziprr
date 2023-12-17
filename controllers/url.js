const shortId = require("shortid");
const url = require("../models/url.js");
async function handleGenerateNewShortURL(req, res) {
  let Id;
  if (req.body?.cutomisedId) {
    Id=  req.body.cutomisedId.trim();
    console.log(req.body.cutomisedId);
  } else {
     Id = shortId().trim();
  }
  let redirectUrl;
  if (req.body.url.includes("https")) redirectUrl = req.body.url;
  else redirectUrl = "https://" + req.body.url;
  let newURL;
  try {
     newURL= await url.create({
      shortId: Id,
      redirectUrl: redirectUrl,
      vistHistory: [],
      createdBy: req.user._id,
    });
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
}

async function handleGetUrl(req, res) {
  const allURL = await url
    .find({ createdBy: req.user._id })
    .sort({ createdAt: -1 });
  res.render("url.pug", { allURL, user: req.user });
}

async function handleURL(req, res) {
  const shortId = (req.params.id).trim();
  const entry = await url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (!entry) return res.render("404", { user: req?.user });
  res.redirect(entry.redirectUrl);
}

async function handleUrlAnalytics(req, res) {
  const shortId = req.params.id;
  const entry = await url.findOne({ shortId });
  res.json({
    totalClicks: entry.visitHistory.length,
    Analytics: entry.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleURL,
  handleUrlAnalytics,
  handleGetUrl,
};
