const express = require("express");
const router = express.Router();
const { validateAtRegister, validateAtLogin } = require("../validator/user");

const {
  getAllUsers,
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers);
router.route("/register").post(validateAtRegister, registerUser);
router.route("/login").post(validateAtLogin, loginUser);
router.route("/:id").get(getUser);

module.exports = router;
