const mongoose = require("mongoose");

// vIL1lyRQQBI0o2rB
async function dbConnect() {
  await mongoose.connect(`mongodb+srv://arbaaazkhanark23:vIL1lyRQQBI0o2rB@cluster0.ereusgy.mongodb.net/`);
  console.log("Database Connected");
}

module.exports = dbConnect;
