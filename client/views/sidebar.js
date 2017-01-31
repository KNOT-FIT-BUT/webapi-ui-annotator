var app = require('ampersand-app');
var _ = require('underscore');
var View = require('ampersand-view');
var templates = require('../templates');
//var eb = require('../eventbus');

module.exports = View.extend({
    template: templates.sidebars.assets,

    events: {
        'click div[data-hook="hide"]': 'hide',
        'change input[name=assets]': 'assetChange',
        'click i.add.circle': 'loadAsset',
        'click i.remove.circle': 'removeAsset'
    },

    initialize: function (options) {
        View.prototype.initialize.apply(this, arguments);
        this.model = app.toolkit;
        var self = this;
        this.model.on("toa_refresh", function (a, b) {
            self.render();
            var tool_name = "";
            if (self.model.getSelectedTool() != null) {
                tool_name = self.model.getSelectedTool().name;
                console.log(tool_name);
            }
            var dpd = $('#toolList');
            dpd.dropdown('destroy');
            dpd.dropdown({
                debug: true,
                onChange: function (val) {
                    //this.model.toolSelected(val);
                    console.log("tool selected:", val);
                    self.model.toolSelected(val);
                },
                "set selected": "figa"
            });
            $('.ui.checkbox').checkbox();
        })

    },

    ref: function (event) {
        console.log("change!!", event);
        this.render();
    },

    assetChange: function (event, b, c) {
        console.log(event.target.value);
        this.model.assetSelected(event.target.value);
    },

    hide: function () {
        //this.el.sidebar("hide");
        $('#pageSidebar').sidebar('toggle');
    },

    loadAsset: function (event) {

        app.trigger("load_asset", {arg: event.target.attributes.getNamedItem("data-value").nodeValue});
    },

    removeAsset: function (event) {
        app.trigger("drop_asset", {arg: event.target.attributes.getNamedItem("data-value").nodeValue});
    }


});
