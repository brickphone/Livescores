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
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email: email });
          if (!user) return done(null, false);
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            return done(null, false);
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

// serializing user 
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});