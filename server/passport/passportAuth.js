
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const createError = require('http-errors');
const User = require('../schema/userSchema')

passport.serializeUser(function (user, cb) {
    // console.log(`serailize ${user} `);
    cb(null, user.id);
  });
  
  passport.deserializeUser(function (id, cb) {
    User.findById(id).then((userFind) => {
      cb(null, userFind);
    });
    // console.log(`deserialize  ${id} `);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/v1/user/login/google/callback",
      },
     async (accessToken, refreshToken, profile, done) => {
       const email = profile.emails[0].value;
       const googleId = profile.id;
        const user = await User.findOne({ googleId });
        if (user) {
          return done(null, user);
        }else{
          const userExist = await User.findOne({ email });
          if(userExist){
            return done(createError(405, 'Email already exist'));
          }else{
            const newUser = await User.create({
              email,
              name: profile.displayName,
              googleId: profile.id,
            });
            return done(null, newUser);
          }
        } 
      }
    )
  );