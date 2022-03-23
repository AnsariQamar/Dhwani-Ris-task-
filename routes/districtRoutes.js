const router = require("express").Router();
const District = require("../models/District");
const verifyToken = require("../middleware/verifyToken");
const form = require("../index");

//Get district data with a particular state id
router.get("/get-district", verifyToken, async (req, res) => {
  let { state_id } = req.query;
  if (!state_id) {
    res.status(400).send({
      success: false,
      status: 400,
      message: "State Id is required",
    });
  } else {
    let data = await District.find({
      state_id: state_id,
    });
    data = data.map((ele) => {
      const { _id, district_name } = ele;
      return {
        id: _id,
        district_name: district_name,
      };
    });
    res.status(200).send({
      success: true,
      status: 200,
      message: "District Detail",
      timestamp: "",
      district: data,
    });
  }
});

//create a new district
router.post("/create", verifyToken, async (req, res) => {
  let state_id;
  let district_name;
  await form.parse(req, function (err, fields, files) {
    district_name = fields.district_name;
    state_id = fields.state_id;
  });
  if (!state_id) {
    res.status(400).send({
      success: false,
      status: 400,
      message: "State Id is required",
    });
  } else if (!district_name) {
    res.status(400).send({
      success: false,
      status: 400,
      message: "Got error while saving",
      ERROR: {
        district_name: ["District Name cannot be blank"],
      },
    });
  } else {
    const data = new District({
      state_id: state_id,
      district_name: district_name,
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
