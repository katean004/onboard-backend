require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const User = require("./models/User");
const app = express();

// for running backend on same pc as frontend without hosting
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/users";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.post("/users", async (req, res) => {
  const user = new User({
    id: 5,
    profile: {
      id: 5,
      linkedin_url: "https://www.linkedin.com/company/onboardio/",
      twitter_url: "https://www.twitter.com/onboardio/",
      instagram_url: "https://www.instagram.com/onboardio/",
      website_url: "https://onboard.io",
      bio: "This is my tagline.",
      job_title: "Title"
    },
    avatar: "https://assets.onboard.io/assets/a/5/5/fswnuakkcn.jpg",
    first_name: "John",
    last_name: "Smith",
    name: "John Smith",
    created_at: "2020-10-01T19:40:40Z"
  });
  await user.save();
  res.redirect("home");
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  res.send(user);
});

app.listen(8000, () => {
  console.log("Serving on port 8000");
});
