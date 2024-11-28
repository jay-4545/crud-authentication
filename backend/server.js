const express = require("express");
const connectToDatabase = require("./db/connect");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const server = express();
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");

server.use(express.json());
server.use(cors());
server.use(fileUpload());
server.use("/uploads", express.static("uploads"));

server.use("/category", categoryRouter);
server.use("/users", userRouter);

const start = async () => {
  try {
    await connectToDatabase();
    console.log("Connect To Databse");
    server.listen(process.env.PORT, () => {
      console.log(`server is listen on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
