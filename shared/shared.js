const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`connection host ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};
