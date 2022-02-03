
const { auth } = require('express-openid-connect');

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
  app.use(auth(config));
}

module.exports = {
  initializeAuth0
}
