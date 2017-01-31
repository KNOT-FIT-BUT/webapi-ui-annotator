var app = require('ampersand-app');
var PageView = require('../base');
var assetItem = require('./assetItem');
var _ = require('underscore');

module.exports = PageView.extend({
    template: "<div class='ui labels'></div>",
    autoRender: true,

    events: {},

    bindings: {},

    initialize: function (options) {
        //View.prototype.initialize.apply(this, arguments);
        this.model = options.model
        //this.collection = options.collection;
        this.collection.on("add", _.bind(this.render, this));
        this.listenTo(app, "selected_tool_changed", _.bind(this.render, this));
        this.listenToOnce(app, "toa_changed", _.bind(this.render, this));


    },

    render: function () {

        this.renderWithTemplate();
        console.log("rendering assets subview", this.model.filtered_assets.length);
        if (this.model.filtered_assets.length > 0) {
            this.renderCollection(this.model.filtered_assets, assetItem, this.el);
        }
        ;
        return this;
    },


});