const mongoose = require("mongoose");

const socialworkSchema = new mongoose.Schema({
  names: Array,
});

const Socialwork = mongoose.model("socialwork", socialworkSchema);

module.exports = Socialwork;
