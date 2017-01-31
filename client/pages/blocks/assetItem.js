var app = require('ampersand-app');
var PageView = require('../base');
var templates = require('../../templates');
//var eb = require('../../eventbus');

module.exports = PageView.extend({
    template: templates.blocks.assetItem,
    autoRender: true,

    events: {
        //'mouseenter .card': 'kbpreview',
        'click [data-hook="asset"]': 'select'
    },

    bindings: {
        'model.name': {
            type: 'text',
            selector: ".name",
        },

        'model.selected': {
            type: "booleanClass",
            selector: ".label",
            yes: "blue",
            no: "basic"
        },
        'model.state': {
            selector: ".label",
            type: function (el, value, previousValue) {
                el.classList.remove("red", "yellow", "orange", "green")
                switch (value) {
                    case 0:
                        el.classList.add("red");
                        break;
                    case 1:
                        el.classList.add("red");
                        break;
                    case 2:
                        el.classList.add("yellow");
                        break;
                    case 3:
                        el.classList.add("orange");
                        break;
                    case 4:
                        el.classList.add("green");
                        break;
                }
            }

        },
        'model.isLoading': {
            type: "attribute",
            hook: "pref_icon",
            name: "class"

        },

    },

    render: function () {
        console.log("rendering assetItem", this.model);
        this.renderWithTemplate();
        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        return this;
    },

    select: function (event) {
        app.toolkit.assetSelected(this.model.id);
    }


});