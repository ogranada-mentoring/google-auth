const express = require('express')
const { requiresAuth } = require('express-openid-connect');

function initPublicRouter() {
  const router = express.Router()
  router.get('/api/v1', function(req, res) {
    console.log("New request GET to /");
    res.json({message: 'Hello world!'});
  });

  router.get('/api/session', function(req, res) {
    console.log("New request GET to /");
    res.json({session: req.session});
  });

  router.get('/private', requiresAuth(), (req, res) => {
    res.send('Si estás viendo esto estás autenticado.')
  });

  return router;
}

module.exports = initPublicRouter
