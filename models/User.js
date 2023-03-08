const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, require: [true, "name is required!"], trim: true },
  email: { type: String, require: [true, "email is required!"] },
  password: { type: String, require: [true, "password is required!"] },
});

module.exports = mongoose.model("User", UserSchema);
