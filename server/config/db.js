const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");

dotenv.config();

mongoose.set('strictQuery', true); // Avoid deprecation warning


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Mognodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
