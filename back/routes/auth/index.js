const express = require('express');
const router = express.Router();
const google = require('./google');
const facebook = require('./facebook');
const linkedin = require('./linkedin');
const twitter = require('./twitter');
const local = require('./local');

function prepareRoutes() {
  router.get('/failed', (req, res) => res.send('You Failed to log in!'))
  router.use(google());
  router.use(facebook());
  router.use(linkedin());
  router.use(twitter());
  router.use(local());
  return router

}

module.exports = prepareRoutes;
