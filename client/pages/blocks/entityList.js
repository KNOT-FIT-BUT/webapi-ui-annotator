var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');
var EntityListItem = require('./entityListItem');

module.exports = PageView.extend({
    template: templates.blocks.entityList,

    events: {
        'click a[data-hook="button"]': 'onButtonClick',

    },


    bindings: {
        'model.sortIcon': {
            type: "attribute",
            name: 'class',
            hook: 'sortIcon'
        }
    },


    initialize: function (options) {
        this.model = app.workset;
        this.model.listenTo(this.model, "refresh", _.bind(this.render, this));

    },

    pack: function (screenHeight, heightPercentage) {
        var headerH = $("#entityListHeader").outerHeight(true);
        var container = Math.floor(screenHeight / 100 * heightPercentage);
        var usable = container - headerH;
        changecss("#entityListContent", "height", usable + "px");
        changecss("#entityListContent", "max-height", usable + "px");
        return container;
    },

    render: function () {
        this.renderWithTemplate();
        console.log("rendering entity list");
        if (this.model.entities.length > 0) {
            this.renderCollection(this.model.entities, EntityListItem, this.queryByHook('entityList'));
        }

        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    afterRender: function () {
        /*$("a[data-hook='sort']")
         .popup({
         on    : 'hover'
         })
         ;*/
    },

    onButtonClick: function (event) {

        var target = $(event.target).is("i.icon") ? $(event.target).parent() : $(event.target);
        var action = target.attr("data-action");
        var argument = target.attr("data-arg");
        console.log("click", action);
        switch (action) {
            case "sort":
                this.model.cycleSort();
                break;
            case "filter":

                break;
            case "settings":
                $('[data-hook="assetModal"]').modal({"duration": 0}).modal('show');
                break;
            default:
                break;
        }
    }


});
