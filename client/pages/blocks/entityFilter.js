var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');
var filterButton = require('./entityFilterItem');


module.exports = PageView.extend({
    //autoRender: true,
    template: templates.blocks.entityFilter,


    bindings: {
        'model.editor_filter': {
            type: 'booleanClass',
            selector: '[data-scope="editor"]',
            yes: 'active',
            no: ''

        },
        'model.entities_filter': {
            type: 'booleanClass',
            selector: '[data-scope="entities"]',
            yes: 'active',
            no: ''
        }

    },

    events: {
        'click [data-scope="editor"]': 'onScopeChange',
        'click [data-scope="entities"]': 'onScopeChange',
        'click .ui.button': "onButtonClick"
    },

    initialize: function () {
        this.model = app.workset
        this.collection = app.workset.groups;
        this.listenTo(app.workset, "refresh", _.bind(this.render, this));

    },

    render: function () {
        console.log("rendering filter popup");
        $("[data-action='filter']").popup('destroy');
        $(".checkbox").checkbox('destroy');
        this.renderWithTemplate();
        this.renderCollection(this.collection, filterButton, this.queryByHook('groupFilters'));
        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    afterRender: function () {

        $("[data-action='filter']").popup({
            on: "click",
            popup: "#entityFilterPopup",
            inline: true,
            hoverable: false,
            position: 'right center',
            delay: {
                show: 300,
                hide: 300
            }
        });

        /*$(".checkbox").checkbox({onChange: function(event) {
         console.log('onChange called', event);
         }});*/
    },

    onButtonClick: function (event) {

        var target = $(event.target).is("i.icon") ? $(event.target).parent() : $(event.target);
        var action = target.attr("data-action");
        switch (action) {
            case "check_all":
                $(".ui.checkbox.filter").checkbox("check");
                break;
            case "toggle":
                $(".ui.checkbox.filter").checkbox("toggle");
                break;
            case "uncheck_all":
                $(".ui.checkbox.filter").checkbox("uncheck");
                break;
                break;
                ;
        }
    },

    onScopeChange: function (event) {
        var scope = event.target.getAttribute("data-scope");
        this.model.toggleScope(scope);
    }


});


