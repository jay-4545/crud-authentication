const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next, isAdminOnly) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        invalidToken: true,
        msg: "No token provided!",
      });
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.SECRET);

    if (isAdminOnly && user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized to access this route!" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, invalidToken: true, msg: error.message });
  }
};

const authenticateAdmin = async (req, res, next) => {
  authenticate(req, res, next, true);
};

const authenticateUser = async (req, res, next) => {
  authenticate(req, res, next, false);
};

module.exports = { authenticateAdmin, authenticateUser };
