const passport = require('passport');
const passportFacebookStrategy = require('passport-facebook');

function prepareStrategy() {
  const FacebookStrategy = passportFacebookStrategy.Strategy;

  const strategy_name = 'facebook';

  passport.use(strategy_name, new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
  },
    function (accessToken, refreshToken, profile, done) {
      console.log(accessToken); // PRIVADO
      console.log(refreshToken); // PRIVADO
      console.log(profile); // PRIVADO
      return done(null, profile);
    }
  ));
}

module.exports = prepareStrategy;
