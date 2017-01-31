var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');
//var eb = require('../../eventbus');

module.exports = PageView.extend({
    template: templates.blocks.entityInfo,

    events: {
        'click [data-hook=showBar]': 'showsidebar'
    },

    bindings: {
        'model.entitySelected.coref': {
            type: "text",
            selector: ".coref"
        }

    },

    initialize: function (options) {
        var kbpreview = null;
        this.model = app.workset;
        //this.listenTo(this.model, "change:entitySelected", _.bind(this.render, this));
        this.listenTo(this.model, "onSelect", _.bind(this.render, this));

        this.listenTo(app, "kbpreview", _.bind(this.renderKBpreview, this));
        $('#pageSidebar2').sidebar({
            overlay: false,
            dimPage: false,
            onHide: function () {
                app.trigger("kbpreview", {arg: null});
            },
        });

    },

    pack: function (screenHeight, heightPercentage) {
        var headerH = $("#entityInfoHeader").outerHeight(true);
        var container = Math.floor(screenHeight / 100 * heightPercentage);
        var usable = container - headerH;
        changecss("#entityInfoContent", "height", usable + "px");
        changecss("#entityInfoContent", "max-height", usable + "px");
        return container;
    },

    render: function () {
        this.renderWithTemplate();
        console.log("rendering entity info");
        /*$('#pageSidebar2').sidebar("destroy");
         if(this.model.entitySelected != null && this.model.entitySelected.others && this.model.entitySelected.others.length > 1){
         $('#pageSidebar2').sidebar({
         overlay: false,
         dimPage: false,
         onHide: function(){eb.trigger("kbpreview",{arg:null});},
         });

         }*/

        return this;
    },


    renderKBpreview: function (data) {
        console.log("entityInof, kb preview", data);
        this.preview = data.arg;
        this.render();
    },

    showsidebar: function () {
        console.log("yohoooo");
        if (this.model.entitySelected != null && this.model.entitySelected.others && this.model.entitySelected.others.length > 1) {
            $("#pageSidebar2").sidebar("toggle");
        }

    }

});
