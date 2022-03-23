const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("userdatas", UserSchema);
