const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');
const initServices = require('./services');
const initPublicRouter = require('./routes/public');
const prepareRoutes = require('./routes/auth');
const { initializeAuth0 } = require('./services/auth0');
const initMercadoPagoRouter = require('./routes/MERCADOPAGO.JS');

function main() {
  dotenv.config()
  const PORT = process.env.PORT;
  const app = express();
  console.log(process.env.SESSION_SECRET)
  app.use(session({
    secret: process.env.SESSION_SECRET,
  }));
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  // Add headers before the routes are defined
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  initServices(app);
  // Initializes passport and passport sessions
  app.use(passport.initialize());
  app.use(passport.session()); // SOLO PARA TWITTER
  initializeAuth0(app);
  app.use(initPublicRouter());
  app.use(initMercadoPagoRouter());
  app.use(prepareRoutes());

  app.use(express.static('./public'))

  app.listen(PORT, function () {
    console.log(`App listening the port [${PORT}]!`);
  });
}

main();
