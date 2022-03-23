const router = require("express").Router();
const State = require("../models/State");
const verifyToken = require("../middleware/verifyToken");
const form = require("../index");

//get all state details
router.get("/get-state", verifyToken, async (req, res) => {
  let data = await State.find({});
  data = data.map((ele) => {
    const { _id, state_name } = ele;
    return {
      id: _id,
      state_name: state_name,
    };
  });
  res.status(200).send({
    success: true,
    status: 200,
    message: "State Details",
    state: data,
  });
});

//create a new state
router.post("/create", verifyToken, async (req, res) => {
  let state_name;
  await form.parse(req, function (err, fields, files) {
    state_name = fields.state_name;
  });
  if (!state_name) {
    res.status(200).send({
      success: false,
      status: 200,
      message: "Got error while saving",
      ERROR: {
        state_name: ["State Name cannot be blank"],
      },
    });
  } else {
    const data = new State({
      state_name:state_name
    });
    const result = await data.save();
    res.status(200).send({
      success: true,
      status: 200,
      message: "Operation performed successfully",
    });
  }
});

module.exports = router;
