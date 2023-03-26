const User = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { createError } = require("../errors/api-error");
const bcrypt = require("bcrypt");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return next(createError("Already have an account", 500));
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(newUser);
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(createError("User does not have an account", 404));
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid password.");
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

module.exports = { getAllUsers: getUsers, registerUser, loginUser, getUser };
