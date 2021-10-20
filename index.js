require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User");
const app = express();

// for running backend on same pc as frontend
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

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  res.send(user);
});

app.listen(8000, () => {
  console.log("Serving on port 8000");
});
