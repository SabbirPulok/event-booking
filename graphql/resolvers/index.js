const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const authResolver = require('./auth');

const rootResolver = {
    ...eventsResolver,
    ...authResolver,
    ...bookingResolver
}

module.exports = rootResolver;