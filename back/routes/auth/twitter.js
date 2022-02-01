const express = require('express');
const passport = require('passport');

function prepareRouter() {
  const strategy_name = 'twitter';
  const router = express.Router();
  router.get(`/${strategy_name}/auth`, passport.authenticate(strategy_name, {
    failureRedirect: '/'
  }));


  router.get(`/${strategy_name}/auth/callback`, passport.authenticate(strategy_name, {
      failureRedirect: '/login'
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
