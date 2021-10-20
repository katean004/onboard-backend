const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  profile: {
    id: Number,
    linkedin_url: String,
    twitter_url: String,
    instagram_url: String,
    website_url: String,
    bio: String,
    job_title: String
  },
  avatar: String,
  first_name: String,
  last_name: String,
  name: String,
  created_at: Date
});

module.exports = mongoose.model("User", UserSchema);
