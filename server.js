const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");


dotenv.config({ path: "./config/config.env" });


app.use(express.static(__dirname + '/public'));

//importing database schema
const ShortUrl = require("./models/shortUrl");

const dbUrl = process.env.MONGO_URI
const localdb = "mongodb://localhost/urlShortner"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// now we can take url from ejs file as it is the page reques is coming from
//to make url work properly use url encoded

// It will call shortUrl.js and will create a schema
//Since it is async function we use async and await
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.post("/clearUrls", async (req, res) => {
  await ShortUrl.deleteMany();
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl});
  if (shortUrl == null) return res.sendStatus("404");

  shortUrl.clicks++;
  shortUrl.save();
  console.log(shortUrl.full);
  res.redirect(shortUrl.full);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`port running on ${PORT}`) );
