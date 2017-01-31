var app = require('ampersand-app');
var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({


    initialize: function () {
        app.registry.store(this);
        this.on('destroy', function () {
            app.registry.remove(this.getType(), this.getId());
        }, this);

    }

});