const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const { queryUser } = require('../db');

function prepareStrategy() {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
    (email, password, done) => {
      queryUser(email, password)
        .then(user => {
          if (user === null) {
            done(null, false);
          } else {
            done(null, user);
          }
        })
        .catch(error => {
          done(error);
        })
    }
  ));
}

module.exports = prepareStrategy;
