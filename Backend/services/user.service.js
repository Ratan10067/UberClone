const userModel = require("../models/user.models");

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All Fields are Required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email: email,
    password: password,
  });
  return user;
};

module.exports = {
  createUser,
};
