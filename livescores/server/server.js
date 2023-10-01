const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./database/models/user.js")
const mongoConnection = require("./database/index.js")

const app = express();
const PORT = 8080;
app.use(express.json());



app.post("/user", async(req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})


app.listen(PORT, function(err) {
  if (err) {
    console.log("server could not start", err) 
  } else {
    console.log("Server listening on Port:", PORT)
  }
})