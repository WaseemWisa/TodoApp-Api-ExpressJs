const { validationResult } = require('express-validator');
const taskModel = require('../models/task.model');
const asyncHandler = require('express-async-handler');



const getAll = asyncHandler(async (req , res) => {
  const userId = req.user.payload._id;
  const tasks = await taskModel.find({owner: userId}).select("-__v");
  res.status(200).json({msg: "User Data", data: tasks});
})


const getTask = asyncHandler(async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  res.status(200).json({ msg: "Task Updated Successfully", data: task });
});

const addTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { title, status, owner } = req.body;
    const newTask = await taskModel.create({ title, status, owner });
    res.status(201).json({ msg: "A New Task Added Successfully", data: newTask });
  }
});

const upDateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updateTask = await taskModel.findByIdAndUpdate(
    taskId,
    { $set: { ...req.body } },
    { new: true }
    );
    res.status(200).json({ msg: "A Task Updated Successfully", data: updateTask });
});
  
const deleteTask = asyncHandler(async (req, res) => {
    const tasks = await taskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "A Task Deleted Successfully", data: "" });
});

module.exports = {
  addTask,
  getAll,
  getTask,
  deleteTask,
  upDateTask
}