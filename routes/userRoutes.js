const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
const form = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/SECRET");

//user login
router.post("/login", async (req, res) => {
  let username;
  let password;
  await form.parse(req, function (err, fields, files) {
    (username = fields.username), (password = fields.password);
  });
  if (!username || !password) {
    res.status(400).send({
      success: false,
      status: 400,
      message: "Invalid Parameters",
    });
  } else {
    const data = await User.findOne({ username: username });
    if (!data) {
      res.status(401).send({
        success: false,
        status: 401,
        message: "Authentication Failed",
      });
    } else {
      let pwCompare = await bcrypt.compare(password, data.password);
      console.log("pwCompare", pwCompare);
      let token = jwt.sign({ username, password }, SECRET, {
        expiresIn: "2hr",
      });
      if (pwCompare) {
        res.status(200).send({
          success: true,
          status: 200,
          message: "Login Successfull",
          token: token,
        });
      } else {
        res.status(401).send({
          success: false,
          status: 401,
          message: "Authentication Failed",
        });
      }
    }
  }
});

//user logout
router.get("/logout", verifyToken, async (req, res) => {
  res.status(200).send({
    success: true,
    status: 200,
    message: "Successfully logged out",
  });
});

//user signup
router.post("/signup", async (req, res) => {
  let username;
  let password;
  await form.parse(req, function (err, fields, files) {
    (username = fields.username), (password = fields.password);
  });
  console.log(username, password);
  if (!username || !password) {
    res.status(400).send({
      success: false,
      status: 400,
      message: "Invalid Parameters",
    });
  } else {
    password = await bcrypt.hash(password, 10);
    let token = jwt.sign({ username, password }, SECRET, { expiresIn: "2hr" });

    const data = new User({
      username: username,
      password: password,
    });
    const result = await data.save();
    res.status(200).send({
      success: true,
      status: 200,
      message: "Signup Successfull",
      token: token,
    });
  }
});

module.exports = router;
