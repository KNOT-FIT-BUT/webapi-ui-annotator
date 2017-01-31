var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');
var Events = require('ampersand-events');
//var eb = require('../../eventbus');
var dropdown = require('../semanticui/dropdown')


module.exports = PageView.extend({
    //autoRender: true,
    template: templates.blocks.editorMenu,

    bindings: {
        'model.cursorPos':{
            type:"text",
            hook:"cursorPos"
        }
    },

    events: {
        'click a[data-hook="button"]': 'onButtonClick',
    },

    initialize: function () {
        this.fileSelector = document.createElement('input');
        this.fileSelector.setAttribute('type', 'file');
        this.fileSelector.addEventListener('change', $.proxy(this.readFile, this), false);
        this.collection = app.filesss;
        this.model = app.workset;

    },

    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.collection, row, this.queryByHook('dropItems'));
        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    afterRender: function () {
        $('#editorHeader .item').tab({history: false});
        $('[data-hook="dropBase"]').dropdown({debug: false, on: 'click', duration: 10, delay: {show: 50, hide: 10}});
    },

    onButtonClick: function (event) {

        var target = $(event.target).is("i.icon") ? $(event.target).parent() : $(event.target);
        var action = target.attr("data-action");
        var argument = target.attr("data-arg");
        console.log("click", action);
        switch (action) {
            case "annotateSelection":
            case "annotate":
            //$("#editorBlockDimmerText").text("Processing...");
            //this.dimmer.dimmer("show");
            case "getExampleFile":
                //$("#editorBlockDimmerText").text("Loading file: "+argument);
                //this.setBussy(true);
                app.trigger(action, {arg: argument});
                break;
            case "loadLocalFile":
                this.loadLocalFile();
                break;
            case "showAssetManager":
                app.trigger("show_asset_manager");

                break;
                ;
        }
    },

    loadLocalFile: function () {
        this.fileSelector.click();

    },
    /*
     annotate:function(){
     eb.trigger('annotate');
     },
     */
    annotateSelected: function () {
    },
    getRemoteFile: function () {
    },
    saveJSON: function () {
    },
    saveXML: function () {
    },
    saveYAML: function () {
    },


    readFile: function (event) {
        var model = window.registry.lookup("text");
        var files = event.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function () {
            model.text = this.result;
        };
        reader.readAsText(file);
    },

    test: function (event) {
        console.log(event.target);
    }

});


var row = PageView.extend({
    template: templates.widgets.dropdownrow,
    autoRender: true,
    render: function () {

        this.renderWithTemplate();
        //console.log("file row", this.el, this.model);
        return this;
    }

});