var moonbootsConfig = require('./moonboots-conf');

module.exports = {
    // Tell the Hapi server what URLs the application should be served from.
    // Since we're doing clientside routing we want to serve this from some type
    // of wildcard url.
    // examples:
    //     '/{p*}' - match everything that isn't matched by something more specific
    //     '/dashboard/{p*}' - serve the app at all routes starting with '/dashboard'
    appPath: '/{p*}',
    // The moonboots config
    moonboots: moonbootsConfig({})
};