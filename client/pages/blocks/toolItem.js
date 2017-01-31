var app = require('ampersand-app');
var PageView = require('../base');
var templates = require('../../templates');


module.exports = PageView.extend({
    template: templates.blocks.toolItem,
    autoRender: true,

    events: {
        //'mouseenter .card': 'kbpreview',
        'click [data-hook="tool"]': 'select'
    },

    bindings: {
        'model.selected': {
            type: "booleanClass",
            selector: ".button",
            yes: "blue",
            no: ""
        },
    },


    render: function () {

        this.renderWithTemplate();
        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        return this;
    },

    select: function (event) {
        console.log("tool selected", event.target, this.model.name);
        app.toolkit.toolSelected(this.model.name);
    }


});