var MoonbootsStatic = require('moonboots-static');
var _ = require('underscore');
var moonbootsConfig = require('./moonboots-conf');




var config = function (options) {
    options || (options = {});
    return _.extend({
        verbose:true,
        moonboots: moonbootsConfig(options.moonboots || {}),
        public: __dirname + '/public',
        directory: __dirname + '/build',
        cb: function (err) {
            console.log(err || 'Done!');
        }
    }, _.omit(options, 'moonboots'));
};



new MoonbootsStatic(config());