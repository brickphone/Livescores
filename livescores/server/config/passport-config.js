const passport = import('passport');
const LocalStrategy = import('passport-local').Strategy;

const User = import('../database/models/user'); // Your User model

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Field for username (in this case, email)
      passwordField: 'password', // Field for password
    },
    async (email, password, done) => {
      // Your authentication logic here
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});