const mongoose = require("mongoose");
const Schema =  mongoose.Schema;


const TaskSchema = new Schema({
  title: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString().toString()
  },
  ownerId: {
    type: String,
  }
}) 


module.exports = mongoose.model("Task", TaskSchema);