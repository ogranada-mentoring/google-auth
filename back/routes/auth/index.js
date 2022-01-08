const express = require('express');
const router = express.Router();
const google = require('./google');

function prepareRoutes() {
  router.get('/failed', (req, res) => res.send('You Failed to log in!'))
  router.use(google());
  return router

}

module.exports = prepareRoutes;
