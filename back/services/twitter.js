const passport = require('passport');
const passportTwitterStrategy = require('passport-twitter');

/**
 * NOTA: como usa v1 requiere pedir primvilegios de elevacion
 * en el developer portal de twitter.
 */

function prepareStrategy() {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  const TwitterStrategy = passportTwitterStrategy.Strategy;

  const strategy_name = 'twitter';

  passport.use(strategy_name, new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
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
