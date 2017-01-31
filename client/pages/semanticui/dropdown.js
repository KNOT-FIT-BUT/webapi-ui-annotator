var app = require('ampersand-app');
var PageView = require('../base');
var templates = require('../../templates');
var _ = require('underscore');

var row = PageView.extend({
    template: templates.widgets.dropdownrow,
    autoRender: true,
    render: function () {

        this.renderWithTemplate();
        console.log("file row", this.el, this.model);
        return this;
    }

});


module.exports = PageView.extend({
    template: templates.widgets.dropdown,
    //autoRender:true,

    bindings: {
        'clicl a': 'rflclick'
    },

    initialize: function (options) {
        console.log(options);
        this.el = options.el;
        this.collection = app.filesss;
    },

    render: function () {

        //this.renderWithTemplate();
        console.log("dwopdown yolo", this.el, this.collection);
        this.renderCollection(this.collection, row, this.queryByHook('dropItems'));
        //console.log(collectionView);
        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    rflclick: function () {
        console.log("click");
    },

    afterRender: function () {

        $('[data-hook="dropBase"]').dropdown({debug: false, on: 'hover', duration: 10, delay: {show: 50, hide: 10}});

    }


});

