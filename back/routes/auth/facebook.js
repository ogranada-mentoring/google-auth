const express = require('express');
const passport = require('passport');

function prepareRouter() {
  const strategy_name = 'facebook';
  const router = express.Router();
  router.get('/facebook/auth', passport.authenticate(strategy_name, {
    failureRedirect: '/',
    session: false,
  }));


  router.get('/facebook/auth/callback', passport.authenticate(strategy_name, {
      failureRedirect: '/login',
      session: false,
    }),
    function (req, res) {
      console.log('TODO SALIO BIEN :D');
      const token = 'new_user_token'
      res.redirect('/?token='+token);
    });

  router.get('/login', (req, res) => {
    res.redirect('http://localhost:5500')
  })

  return router;
}

module.exports = prepareRouter;