const express = require('express');
const { linkedinAuthenticate, linkedinTokenAquisition } = require('../../middlewares/linkedinAuth');

function prepareRouter() {
  const router = express.Router();

  router.get('/linkedin/auth', linkedinAuthenticate);

  router.get('/linkedin/auth/callback', linkedinTokenAquisition, (req, res) => {
    res.json(req.user)
  });


  return router;
}

module.exports = prepareRouter;
