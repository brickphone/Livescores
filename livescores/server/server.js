import express from "express";
import mongoose from "mongoose";
import UserModel from "./database/models/user.js";
import mongoConnection from "./database/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import passportConfig from "./config/passport-config.js";
import jwt from "jsonwebtoken"; 
import { Strategy } from "passport-local";

const app = express();
const PORT = 3000;

// Middleware ----------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// making sure requests from the client side work
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

// signup
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

// login
app.post("/auth/login", (req, res, next) => {
  console.log("Recieved login request:", req.body);
  
  passport.authenticate("login", (err, user) => {
    if (err) throw err;
    console.log("User found in the db:", user);

    if (!user) {
      res.status(401).json({ message: "No user exists" })
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        
        console.log("req.user:", req.user);

        const token = jwt.sign({ user: user.username }, "secretkey", {
          expiresIn: '10min'
        });
        console.log("Token:", token);

        res.status(200).json({ message: "Successfully Authenticated", token: token });
        console.log("Successfully authenticated:", req.headers.authorization);
      });
    }
  })(req, res, next);
});
 
// logout
app.post("/logout", (req, res) => {

  try {
    // clear session data 
    req.session.destroy();
    res.status(200).send("Logout successful");
  } catch (error) {
    console.error("error during logout:", error);
    res.status(500).send("error during logout");
  }
});

// starting server
app.listen(PORT, function(err) {
  if (err) {
    console.log("server could not start", err) 
  } else {
    console.log("Server listening on Port:", PORT)
  }
})
