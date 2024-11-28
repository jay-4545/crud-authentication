const mongoose = require("mongoose");

const connectToDatabase = async () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectToDatabase;
