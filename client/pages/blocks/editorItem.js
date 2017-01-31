var app = require('ampersand-app');
var PageView = require('../base');
var templates = require('../../templates');
var _ = require('underscore');
//var eb = require('../../eventbus');

module.exports = PageView.extend({
    template: templates.blocks.EditorItem,
    autoRender: true,

    events: {
        'click strong': 'onItemSelection',
        'click span': 'onItemSelection'

    },

    bindings: {
        'model.selected': {
            type: 'booleanClass',
            selector: ".item",
            name: "sel",

        },

        'model.highlighted': {
            type: 'booleanClass',
            selector: ".item",
            name: "hglt",

        },

        'model.groupclass': {
            type: 'class',
            selector: ".item",
        },

    },

    initialize: function (options) {
        this.el = options.el;
        this.model = options.model;
        this.listenTo(this.model, "scrollTo", _.bind(this.scrollTo, this));


    },


    render: function () {
        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        this.renderWithTemplate();
        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        return this;
    },

    onItemSelection: function (event) {
        console.log(event.target);
        this.model.item_selected();
        //this.render();
    },


    scrollTo: function () {
        app.trigger("scrollTo", {arg: this});
    }

});