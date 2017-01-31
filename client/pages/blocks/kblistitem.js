var app = require('ampersand-app');
var PageView = require('../base');
var templates = require('../../templates');
//var eb = require('../../eventbus');

module.exports = PageView.extend({
    template: templates.blocks.kblistitem,
    autoRender: true,

    events: {
        'mouseenter .card': 'kbpreview',
        'click .card': 'setpreferred'
    },
    bindings: {
        'model.isPreferred': {
            type: 'booleanClass',
            selector: ".label",
            yes: "",
            no: "hidden"

        },
    },


    render: function () {

        this.renderWithTemplate();
        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        return this;
    },

    kbpreview: function (event) {
        console.log("mouse over ", this.model.id);
        app.trigger("kbpreview", {arg: this.model.id});
    },

    setpreferred: function (event) {
        console.log("set preferred", this.model.id);
        app.trigger("kbsetpreferred", {arg: this.model.id});
    }

});