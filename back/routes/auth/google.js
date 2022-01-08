const express = require('express');
const passport = require('passport');

function prepareRouter() {
  const strategy_name = 'google';
  const router = express.Router();
  router.get('/google/auth', passport.authenticate(strategy_name, {
    scope: ['profile', 'email'],
    session: false,
  }));


  router.get('/google/auth/callback', passport.authenticate(strategy_name, {
      failureRedirect: '/login',
      session: false,
    }),
    function (req, res) {
      console.log('TODO SALIO BIEN :D');
      const token = 'alsihjdkjahsdkjhaskdhakshdkasdh'
      res.redirect('/?token='+token);
    });

  router.get('/login', (req, res) => {
    res.redirect('http://localhost:5500')
  })

  return router;
}

module.exports = prepareRouter;