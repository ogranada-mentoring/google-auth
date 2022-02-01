
const passport = require('passport');
const prepareGoogleStrategy = require('./google');
const prepareFacebookStrategy = require('./facebook');
const prepareTwitterStrategy = require('./twitter');
const prepareLocalStrategy = require('./local');

function initialize() {
    prepareGoogleStrategy()
    prepareFacebookStrategy()
    prepareTwitterStrategy()
    prepareLocalStrategy()
}

module.exports = initialize;
