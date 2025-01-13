const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config({path:'./.env'})
const userRouter = require("./src/route/userRouter");
const port = process.env.PORT;

mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);


app.listen(port, () => console.log(`Server is running on port ${port}`));