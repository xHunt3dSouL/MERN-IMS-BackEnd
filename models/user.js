const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Fullname  is required!"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    validator: validator.isStrongPassword,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//hash the password before saving in db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
