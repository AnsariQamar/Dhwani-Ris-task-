const mongoose = require("mongoose");
const url = "mongodb+srv://Qamar:Qamar@cluster0.4nt7x.mongodb.net/assignmentData?retryWrites=true&w=majority";
console.log("db is connected");
module.exports = mongoose.connect(url, { useNewUrlParser: true });
