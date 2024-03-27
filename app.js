const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()


const taskRoutes = require("./src/routes/task.route");

app.use(bodyParser.json())

app.use("/api/tasks", taskRoutes)

const port = process.env.PORT || 3000;


app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});