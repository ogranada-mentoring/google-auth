const express = require('express');
const passport = require('passport');



function prepareRouter() {
  const router = express.Router();

  router.post('/local/auth', passport.authenticate('local', {
    failureRedirect: '/failed',
    session: false,
  }), (req, res) => {
    res.json(req.user)
  });

  return router;
}

module.exports = prepareRouter;

