const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors')
const { auth } = require('express-openid-connect');
const passport = require('passport');
const initServices = require('./services');
const initPublicRouter = require('./routes/public');
const prepareRoutes = require('./routes/auth');

function initializeAuth0(app) {
  const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.AUTH0_LOCAL_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_BASE_URL,
    secret: process.env.AUTH0_SECRET,
    // routes: {}
  };
  console.log({
    ...config,
    secret: `1`
  })
  app.use(auth(config));
}

function main() {
  dotenv.config()
  const PORT = process.env.PORT;
  const app = express();
  // Add headers before the routes are defined
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  initServices(app);
  // Initializes passport and passport sessions
  app.use(passport.initialize());
  initializeAuth0(app);
  app.use(initPublicRouter());
  app.use(prepareRoutes());

  app.use(express.static('./public'))

  app.listen(PORT, function () {
    console.log(`App listening the port [${PORT}]!`);
  });
}

main();
