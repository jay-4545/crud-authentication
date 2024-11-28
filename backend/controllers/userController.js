const User = require("../model/User");
const userValidator = require("../validators/usersValidator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USERNAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

const signUp = async (req, res) => {
  try {
    userValidator(req.body);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, msg: "Email already exists!" });
    }

    const numberOfUsers = await User.countDocuments();

    if (numberOfUsers === 0) {
      req.body.role = "admin";
    }

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const verificationToken = crypto.randomBytes(64).toString("hex");
    req.body.verificationToken = verificationToken;

    const user = await User.create(req.body);

    const verificationLink = `http://localhost:3000/verifyEmail?token=${verificationToken}&userId=${user._id}`;

    const info = await transporter.sendMail({
      from: `"Jay Kukadiya" <${process.env.ETHEREAL_USERNAME}>`,
      to: req.body.email,
      subject: "Verification Email",
      html: `<p>Please click on this link to verify your email: <a href="${verificationLink}">Verify Email</a><p>`,
    });

    if (!info?.messageId) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to send verification email!" });
    }

    res.status(200).json({ success: true, msg: "Sign-up successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token, userId } = req.query;

    if (!token || !userId) {
      return res
        .status(401)
        .json({ success: false, msg: "No token or userId provided!" });
    }

    const user = await User.findById({ _id: userId, verificationToken: token });

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      verificationToken: "",
    });

    res
      .status(200)
      .json({ success: true, msg: "Email verified successfully!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res
        .status(404)
        .json({ success: false, msg: "Email and password are required!" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid email!" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Email not verified!" });
    }

    const isPasswordSame = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordSame) {
      return res.status(400).json({ success: false, msg: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    const user = User.findById(req.user.userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "No such user exists!" });
    }

    res.status(200).json({ success: true, msg: "Log-out successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, msg: "Token is valid!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

module.exports = {
  signUp,
  verifyEmail,
  signIn,
  signOut,
  checkUser,
};
