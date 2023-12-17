// Inbuilt Module import
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Module Exports
const connectToMongoDB = require("./connect.js");
const url = require("./routes/url.js");
const router = require("./routes/user.js");
const staticRouter = require("./routes/staticRouter.js");
const { checkForAuthentication, restrictTo } = require("./middleware/auth.js");

// Middle ware to set the template engine as pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));

//Static
app.use(express.static(path.join(__dirname, "static")));

//Mongoose Connection
connectToMongoDB(process.env.MONGO_URL);

//Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(checkForAuthentication);

// Routes
// app.use("/url", restrictTo(["NORMAL", "ADMIN"]), url);
app.use("/url", url);
app.use("/", staticRouter);
app.use("/user", router);

// 404
app.use((req, res) => {
  return res.status(404).send(res.render("404.pug", { user: req?.user }));
});

// Server Listener
app.listen(80,()=>{
  console.log("Server Started Successfully");
});
