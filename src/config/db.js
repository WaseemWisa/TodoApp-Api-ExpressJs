const mongoose = require('mongoose');

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is listing");
  } catch (err) {
    console.log(`Database Error: ${err}`);
  }
}

module.exports = main