const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/users");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  res.send(user);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
