var PageView = require('../base');
var toolItem = require('./toolItem');
var _ = require('underscore');

module.exports = PageView.extend({
    template: "<div class='ui eight wide column'></div>",
    autoRender: true,

    events: {},

    bindings: {},

    initialize: function (options) {
        //View.prototype.initialize.apply(this, arguments);
        this.collection = options.collection;
        this.collection.on("add", _.bind(this.render, this));
    },

    render: function () {
        console.log(this.collection.length);
        this.renderWithTemplate();
        if (this.collection.length > 0) {
            this.renderCollection(this.collection, toolItem, this.el);
        }
        ;
        return this;
    },


});