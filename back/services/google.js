const passport = require('passport');
const passportGoogleStrategy = require('passport-google-oauth20');

function prepareStrategy() {
  const GoogleStrategy = passportGoogleStrategy.Strategy;
  
  const strategy_name = 'google';
  
  passport.use(strategy_name, new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken); // PRIVADO
      console.log(refreshToken); // PRIVADO
      console.log(profile); // PRIVADO
      return done(null, profile);
    }
  ));
}

module.exports = prepareStrategy;
