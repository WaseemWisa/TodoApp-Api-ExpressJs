const express = require('express');
const app = express();

const connectDB = require('./src/config/db');
const bodyParser = require('body-parser')

require('dotenv').config()
app.use(bodyParser.json())


const port = process.env.PORT || 3000;

const TaskRoutes = require("./src/routes/task.route");
const UserRoutes = require("./src/routes/user.route");
const TokenRoutes = require("./src/routes/token.route");


// Routes
app.use("/api/tasks", TaskRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/tokens", TokenRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});