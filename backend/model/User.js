const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minLength: 2,
  },

  lname: {
    type: String,
    required: true,
    minLength: 1,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        if (!email) return false;

        const isValid = email.match(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        );

        if (!isValid) {
          return false;
        }

        return true;
      },
      message: "Please provide a valid email address!",
    },
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  resetToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
