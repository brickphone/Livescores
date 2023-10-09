import passport from "passport";
import UserModel from "../database/models/user.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

export default (passport) => {
  // signup stratergy
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Check if user already exists
          const userExists = await UserModel.findOne({ email: email });
          if (userExists) {
            return done(null, false);
          }

          // Create a new user with the provided data
          const user = await UserModel.create({ email, password });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // login stratergy
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "user",
        passwordField: "pass",
      },
      async (user, pass, done) => {
        try {
          const foundUser = await UserModel.findOne({ username: user });
          
          if (!foundUser) {
            return done(null, false, { message: "User not found" });
          }
          
          const isMatch = await bcrypt.compare(pass, foundUser.password);
          
          if (!isMatch) {
            return done(null, false, { message: "Invalid password" });
          }

          // If passwords match, return the user
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});