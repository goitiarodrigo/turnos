const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  name: String,
  src: String,
});

const Avatar = mongoose.model("avatar", avatarSchema);

module.exports = Avatar;
