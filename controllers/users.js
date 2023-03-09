const User = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { createError } = require("../errors/api-error");

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { email: email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return next(createError("Already have account", 500));
  }
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

const loginUser = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const { email: email, password: password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(createError("User does not have an account", 404));
  }
  if (user.password != password) {
    return next(createError("Wrong password", 404));
  }
  res.status(200).json(user);
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const user = await User.findOne({ _id: id });
  console.log(user);
  if (!user) {
    return next(createError(`No user with id : ${id}`, 404));
  }
  res.status(200).json(user);
});

module.exports = { getAllUsers, registerUser, loginUser, getUser };
