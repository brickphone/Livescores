import express from "express";
import mongoose from "mongoose";
import UserModel from "./database/models/user.js";
import mongoConnection from "./database/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import passportConfig from "./config/passport-config.js";
import { generateToken } from "./jwtUtils.js";

const app = express();
const PORT = 3000;

// Middleware ----------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// making sure request from client side work
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// session cookies
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);

// ---- end of middleware

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
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // saving users to db/mongo
    await user.save();
    res.send(user);
    console.log("saved user: ", user)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

passportConfig(passport);

app.post("/auth/login", (req, res, next) => {
  passport.authenticate("local-login", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to login" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send a JWT token
    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
});
 
app.post("/auth/login", (req, res, next) => {
  console.log("recieved login request with email:", req.body.email, "and password", req.body.password);
})

// starting server
app.listen(PORT, function(err) {
  if (err) {
    console.log("server could not start", err) 
  } else {
    console.log("Server listening on Port:", PORT)
  }
})

