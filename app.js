const express = require('express');
const app = express();

const connectDB = require('./src/config/db');
const bodyParser = require('body-parser')

require('dotenv').config()
app.use(bodyParser.json())


const taskRoutes = require("./src/routes/task.route");
const UserRoutes = require("./src/routes/user.route");
const TokenRoutes = require("./src/routes/token.route");


app.use("/api/tasks", taskRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/tokens", TokenRoutes)

const port = process.env.PORT || 3000;


app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});