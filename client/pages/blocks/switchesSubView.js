var app = require('ampersand-app');
var PageView = require('../base');
var assetItem = require('./assetItem');
var _ = require('underscore');
var templates = require('../../templates');

module.exports = PageView.extend({
    template: templates.blocks.toolSwitches,
    autoRender: true,

    events: {},

    bindings: {


    },

    initialize: function (options) {
        //View.prototype.initialize.apply(this, arguments);
        this.model = options.model
        this.listenTo(app, "selected_tool_changed", _.bind(this.render, this));
        this.listenToOnce(app, "toa_changed", _.bind(this.render, this));


    },

    render: function () {

        this.renderWithTemplate();
        _.defer($.proxy(this.afterRender, this));
        return this;

    },

    afterRender: function () {
        var self = this;
        this.queryAll(".checkbox").forEach(function (element) {
            $(element).checkbox({
                onChange: function () {
                    var name = $(this).attr("name");
                    self.model.tool_selected.switches[name] = !self.model.tool_selected.switches[name];

                }
            })
        })
    },


});