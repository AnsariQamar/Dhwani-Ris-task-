const mongoose = require("mongoose");
const DistrictSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  state_id: {
    type: Number,
    require: true,
  },
  district_name: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("districtdatas", DistrictSchema);
