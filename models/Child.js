const mongoose = require("mongoose");
const ChildSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
  sex: {
    type: Number,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  father_name: {
    type: String,
    require: true,
  },
  mother_name: {
    type: String,
    require: true,
  },
  district_id: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("childdatas", ChildSchema);
