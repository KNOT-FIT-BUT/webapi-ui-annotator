var app = require('ampersand-app');
var _ = require('underscore');
var View = require('ampersand-view');
var templates = require('../templates');
//var eb = require('../eventbus');

var assetItem = require('../pages/blocks/assetItem');
var toolItem = require('../pages/blocks/toolItem');

var toolsSubView = require('../pages/blocks/toolsSubView');
var assetsSubView = require('../pages/blocks/assetsSubView');
var switchesSubView = require('../pages/blocks/switchesSubView');
var stateSubView = require('../pages/blocks/stateSubView');

module.exports = View.extend({
    template: templates.modals.assetManager,

    events: {
        //'click [data-hook="tool"]': 'toolChange',
        //'click [data-hook="asset"]': 'assetChange',
    },

    bindings: {
        'model.tool_selected.version': {
            type: "text",
            hook: "toolboxinfo"
        },

        'model.asset_selected.version': {
            type: "text",
            hook: "assetboxinfo"
        },


        'model': {
            hook: "assetControlBtn",
            type: function (el, value, previousValue) {
                console.log("model change?");


            }

        },

    },

    subviews: {
        tools: {
            hook: 'toolbox',
            waitFor: 'model.tools',
            prepareView: function (el) {
                return new toolsSubView({
                    el: el,
                    collection: this.model.tools
                });
            }
        },
        datasets: {
            hook: 'assetbox',
            waitFor: 'model.assets',
            prepareView: function (el) {
                return new assetsSubView({
                    el: el,
                    collection: this.model.assets,
                    model: this.model
                });
            }
        },
        switches: {
            hook: 'switches',
            waitFor: 'model',
            prepareView: function (el) {
                return new switchesSubView({
                    el: el,
                    model: this.model
                });
            }
        },
        states: {
            hook: 'states',
            waitFor: 'model',
            prepareView: function (el) {
                return new stateSubView({
                    el: el,
                    model: this.model
                });
            }
        }
    },

    initialize: function (options) {
        View.prototype.initialize.apply(this, arguments);
        this.model = app.toolkit;
        this.listenTo(app,"show_asset_manager", _.bind(this.show,this));

    },

    render: function () {
        this.renderWithTemplate();
        _.defer($.proxy(this.afterRender, this));
        return this;
    },


    afterRender: function () {
        $('[data-hook="assetModal"]')
            .modal('attach events', '#closeButton', 'hide')
        ;
    },

    ref: function (event) {
        console.log("change!!", event);
        this.render();
    },




    show: function () {
         $('[data-hook="assetModal"]').modal("show");
    },

    loadAsset: function (event) {
        app.trigger("load_asset", {arg: event.target.attributes.getNamedItem("data-value").nodeValue});
    },

    removeAsset: function (event) {
        app.trigger("drop_asset", {arg: event.target.attributes.getNamedItem("data-value").nodeValue});
    }


});

