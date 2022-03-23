const router = require("express").Router();
const Child = require("../models/Child");
const verifyToken = require("../middleware/verifyToken");

//get all childrens data
router.get("/get-childrens", verifyToken, async (req, res) => {
  const data = await Child.find();
  res.status(200).send({
    success: true,
    status: 200,
    message: "child Profile Detail",
    child_profile: data,
  });
});

//create a new Child data
router.post("/create", verifyToken, async (req, res) => {
  const data = req.body;
  if (!data || !data.district_id) {
    res.status(200).send({
      success: false,
      status: 200,
      message: "district Id is required",
    });
  } else {
    const childData = new Child(data);
    await childData.save();
    res.status(200).send({
      success: true,
      status: 200,
      message: "Operation performed successfully",
    });
  }
});

module.exports = router;
