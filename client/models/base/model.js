var app = require('ampersand-app');
var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({


    initialize: function () {
        app.registry.store(this);
        this.on('destroy', function () {
            app.registry.remove(this.getType(), this.getId());
        }, this);

    }

});