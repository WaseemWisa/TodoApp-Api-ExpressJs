const express = require('express');
const router = express.Router();

const taskController = require("../controllers/task.controller");
const  validateTask  = require("../utils/validationTask");

router.post("/add", validateTask , taskController.addTask)
router.get("",  taskController.getAll)
router.get("/:id",  taskController.getTask)
router.delete("/:id",  taskController.deleteTask)
router.patch("/:id",  taskController.upDateTask)
//


module.exports = router