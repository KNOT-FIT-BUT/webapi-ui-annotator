var app = require('ampersand-app');
var PageView = require('../base');
var assetItem = require('./assetItem');
var _ = require('underscore');
var templates = require('../../templates');

module.exports = PageView.extend({
    template: templates.blocks.assetState,
    autoRender: true,

    events: {},

    bindings: {
        'model': {
            selector: '[data-hook="assetState"]',
            type: function (el, value, previousValue) {
                console.log("label change?", value, value.asset_selected);
                el.classList.remove("red", "yellow", "orange", "green")
                if (value.asset_selected != null) {
                    switch (value.asset_selected.state) {
                        case 0:
                            el.classList.add("red");
                            el.innerHTML = "offline";
                            break;
                        case 1:
                            el.classList.add("red");
                            el.innerHTML = "queued";
                            break;
                        case 2:
                            el.classList.add("yellow");
                            el.innerHTML = "loading";
                            break;
                        case 3:
                            el.classList.add("orange");
                            el.innerHTML = "queued";
                            break;
                        case 4:
                            el.classList.add("green");
                            el.innerHTML = "online";
                            break;
                    }
                }
            }
        },

        'model.asset_selected.state': {
            hook: "assetControlBtn",
            type: function (el, value, previousValue) {
                console.log("btn change?");
                el.classList.remove("red", "yellow", "orange", "green", "disabled");
                if (value != null) {
                    switch (value) {
                        case 0:
                            el.classList.add("green");
                            el.innerHTML = "load";
                            break;
                        case 1:
                            el.classList.add("green");
                            el.classList.add("disabled");
                            el.innerHTML = "wait";
                            break;
                        case 2:
                            el.classList.add("yellow");
                            el.classList.add("disabled");
                            el.innerHTML = "wait";
                            break;
                        case 3:
                            el.classList.add("yellow");
                            el.classList.add("disabled");
                            el.innerHTML = "wait";
                            break;
                        case 4:
                            el.classList.add("red");
                            el.innerHTML = "unload";
                            break;
                    }
                }

            }

        },
    },

    initialize: function (options) {
        //View.prototype.initialize.apply(this, arguments);
        this.model = options.model
        this.model.on("change toa_refresh",_.bind(this.render, this));
        //this.model.on("toa_refresh",function(a,b,c){console.log("model change ",a,b,c)});
        //this.listenTo(app, "selected_asset_changed", _.bind(this.render, this));
        this.listenToOnce(app, "toa_changed", _.bind(this.render, this));


    },

    render: function () {

        this.renderWithTemplate();
        _.defer($.proxy(this.afterRender, this));
        return this;

    },

    afterRender: function () {

    },


});