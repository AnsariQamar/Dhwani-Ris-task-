const express = require("express");
const app = express();
require("./mongoose-config");
const formidable = require("formidable");
let form = new formidable.IncomingForm();
module.exports = form;

app.use(express.json());
const districtRoute = require("./routes/districtRoutes");
const stateRoute = require("./routes/stateRoutes");
const childRoute = require("./routes/childRoutes");
const userRoute = require("./routes/userRoutes");

app.use("/api/district", districtRoute);
app.use("/api/state", stateRoute);
app.use("/api/child", childRoute);
app.use("/api/user", userRoute);

app.listen(8000, () => {
  console.log("port is running ");
});
