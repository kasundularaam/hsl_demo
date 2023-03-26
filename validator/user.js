const Joi = require("joi");
const { createError } = require("../errors/api-error");
const asyncWrapper = require("../middleware/async");

const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateAtRegister = asyncWrapper(async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = registerSchema.validate(data);

  if (error) {
    return next(createError(error.details[0].message, 407));
  }
  next();
});

const validateAtLogin = asyncWrapper(async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = loginSchema.validate(data);

  if (error) {
    return next(createError(error.details[0].message, 407));
  }
  next();
});

module.exports = {
  validateAtLogin: validateAtLogin,
  validateAtRegister: validateAtRegister,
};
