const { validationResult } = require('express-validator');
const taskModel = require('../models/task.model');


const getAll = async (req , res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({msg: "All Tasks", data: tasks});
  } catch (error) {
    console.log(error);
  }
}

const getTask = async (req , res) => {
  try {
    const tasks = await taskModel.findById(req.params.id);
    res.status(200).json({msg: "", data: tasks});
  } catch (error) {
    console.log(error);
  }
}

const addTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    } else {
      try {
          const {title , status , owenerId} = req.body;
          const newTask = await taskModel.create({title , status , owenerId});
          res.status(201).json({msg: "A New Task Added Successfully", data: newTask});
      } catch (error) {
        console.log(error);
      }
    }
}

const deleteTask = async (req , res) => {
  try {
    const tasks = await taskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({msg: "A Task Deleted Successfully", data: ""});
  } catch (error) {
    console.log(error);
  }
}


const upDateTask = async (req , res) => {
  try {
    const taskId = req.params.id;
    const updateTask = await taskModel.findByIdAndUpdate(taskId, {$set: {...req.body}}, {new: true});
    res.status(200).json({msg: "A Task Updated Successfully", data: updateTask});
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addTask,
  getAll,
  getTask,
  deleteTask,
  upDateTask
}