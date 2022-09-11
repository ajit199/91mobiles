const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

module.exports = mongoose.model("user", userSchema);
