const prepareGoogleStrategy = require('./google');
const prepareFacebookStrategy = require('./facebook');
// require('./facebook');

function initialize() {
    prepareGoogleStrategy()
    prepareFacebookStrategy()
}

module.exports = initialize;
