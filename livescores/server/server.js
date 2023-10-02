import express, { json } from "express";
import mongoose from "mongoose";
import UserModel from "./database/models/user.js";
import mongoConnection from "./database/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

// Middleware ----------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);

app.post("/user", async (req, res) => {
  try {
    // check if user or email already exists
    const existingUser = await UserModel.findOne({ username: req.body.username });
    const existingEmail = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send("Username already exists");
    } if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    // hash password before save
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserModel({
      username: req.body.password,
      password: hashedPassword,
    });

    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, function(err) {
  if (err) {
    console.log("server could not start", err) 
  } else {
    console.log("Server listening on Port:", PORT)
  }
})