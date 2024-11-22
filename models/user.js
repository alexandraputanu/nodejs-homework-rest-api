const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

//! Definirea modelului User:
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },

  //! În modelul de utilizator, adaug o nouă proprietate, avatarURL, pentru a stoca imaginea. (avatarURL: String,):
  avatarURL: {
    type: String,
    default: null,
  },
});

//! Metode pentru setarea și validarea parolei:
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;