var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');


module.exports = PageView.extend({
    template: templates.blocks.entityFilterItem,
    autoRender: true,

    bindings: {
        'model.prefix': {
            type: 'class',
            selector: ".item",
        },
        'model.visible': {
            type: 'booleanClass',
            selector: '.checkbox',
            yes: 'checked',
            no: ''

        },
        'model.visible': {
            type: 'booleanAttribute',
            selector: '.hidden',
            yes: 'checked',
            no: ''

        },
    },

    events: {},

    render: function () {
        //console.log("rendering filter button", this.el, this.model);
        this.renderWithTemplate();
        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    afterRender: function () {
        var self = this;
        $("#chckbox-" + this.model.prefix).checkbox({
            onChange: function () {
                //self.model.toggleVisibility(true);
                app.trigger("ent:filter", self.model.prefix);
                console.log(self.model.name, self.model.visible);


            }
        });


    },

});