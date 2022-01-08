const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors')
const passport = require('passport');
const initServices = require('./services');
const public_routes = require('./routes/public');
const prepareRoutes = require('./routes/auth');

function main() {
  dotenv.config()
  const PORT = process.env.PORT;
  const app = express();
  // Add headers before the routes are defined
  app.use(cors());
  initServices(app);
  // Initializes passport and passport sessions
  app.use(passport.initialize());

  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());
  app.use(public_routes);
  app.use(prepareRoutes());

  app.listen(PORT, function () {
    console.log(`App listening the port [${PORT}]!`);
  });
}

main();
