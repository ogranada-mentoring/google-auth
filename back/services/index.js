const prepareGoogleStrategy = require('./google');
const prepareFacebookStrategy = require('./facebook');
const prepareLocalStrategy = require('./local');

function initialize() {
    prepareGoogleStrategy()
    prepareFacebookStrategy()
    prepareLocalStrategy()
}

module.exports = initialize;
