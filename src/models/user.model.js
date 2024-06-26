const mongoose = require("mongoose");
const Schema =  mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
/*   tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
  }], */
}) 


module.exports = mongoose.model("User", UserSchema);