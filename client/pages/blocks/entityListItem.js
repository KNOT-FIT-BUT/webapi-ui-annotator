var PageView = require('../base');
var templates = require('../../templates');

module.exports = PageView.extend({
    template: templates.blocks.entityListItem,
    autoRender: true,

    events: {
        'click span': 'itemSelected',
    },

    bindings: {
        'model.selected': {
            type: 'booleanClass',
            selector: ".alabel",
            name: "sel",

        },


        'model.visible': {
            type: 'booleanClass',
            selector: ".alabel",
            yes: "",
            no: "hidden"
        }

    },

    render: function () {

        this.renderWithTemplate();

        //console.log("file row", this.model.id, this.model.start, this.model.stop, this.model.type, this.model.text);
        return this;
    },

    itemSelected: function (event) {
        this.model.entity_selected();
    }

});