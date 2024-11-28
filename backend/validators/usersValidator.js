const MyError = require("../utils/errorUtils");

const userValidator = async (body) => {
  if (!body.fname) {
    throw new MyError("First name is required!", 400);
  }

  if (body.fname.trim().length < 2) {
    throw new MyError("First name is minimum 2 characters!", 400);
  }

  if (!body.lname) {
    throw new MyError("Last name is required!", 400);
  }

  if (body.lname.trim().length < 1) {
    throw new MyError("Last name is minimum 1 characters!", 400);
  }

  if (!body.email.trim()) {
    throw new MyError("Email is required!", 400);
  }

  const isValidEmail = body.email
    .trim()
    .match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

  if (!isValidEmail) {
    throw new MyError("Please Provide a valid email!", 400);
  }

  if (!body.password) {
    throw new MyError("Password is required!", 400);
  }
};

module.exports = userValidator;
