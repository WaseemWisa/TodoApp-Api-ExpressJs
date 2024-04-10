const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString().toString(),
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Task", TaskSchema);
