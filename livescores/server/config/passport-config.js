import passport from "passport";
import UserModel from "../database/models/user.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

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
          // searching for user in db
          const foundUser = await UserModel.findOne({ username: user });
          
          if (!foundUser) {
            return done(null, false, { message: "User not found" });
          }
    
          // comnpare user and password 
          const isMatch = await bcrypt.compare(pass, foundUser.password);
          console.log("found password in db!", isMatch);
          
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

  const GOOGLE_CLIENT_ID = "880754032048-6giud73ubfhqnmph4jp75fs2t5gkpla6.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";

  // google strategy
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  
  function (accessToken, refreshToken, profile, callback) {
    UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return callback(err, user);
    });
  }
));

};



passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});