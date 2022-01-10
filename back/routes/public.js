const express = require('express')

function initPublicRouter() {
  const router = express.Router()
  router.get('/api/v1', function(req, res) {
    console.log("New request GET to /");
    res.json({message: 'Hello world!'});
  });
  return router;
}

module.exports = initPublicRouter
