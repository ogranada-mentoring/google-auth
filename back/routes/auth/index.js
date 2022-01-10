const express = require('express');
const router = express.Router();
const google = require('./google');
const facebook = require('./facebook');

function prepareRoutes() {
  router.get('/failed', (req, res) => res.send('You Failed to log in!'))
  router.use(google());
  router.use(facebook());
  return router

}

module.exports = prepareRoutes;
