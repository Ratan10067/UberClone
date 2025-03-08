const userModel = require("../models/user.models");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const isUserAlrreadyExist = await userModel.findOne({ email });
  if (isUserAlrreadyExist) {
    return res.status(400).json({ message: "User Already Exist" });
  }
  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  return res.status(201).json({ token, user });
};
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  return res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};

const logoutuser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split("")[1];
  res.clearCookie("token");
  await blackListTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutuser,
};
