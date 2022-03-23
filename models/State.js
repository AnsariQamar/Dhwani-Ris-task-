const mongoose = require("mongoose");
const StateSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  state_name: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("statedatas", StateSchema);
