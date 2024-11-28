const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  checkUser,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authentication");
const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/signout", authenticateUser, signOut);
userRouter.get("/verifyEmail", verifyEmail);
userRouter.get("/checkUser", authenticateUser, checkUser);

module.exports = userRouter;
