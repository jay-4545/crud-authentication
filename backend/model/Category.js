const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
    minLength: 10,
    maxLength: 1000,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
