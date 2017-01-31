var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');

module.exports = PageView.extend({
    template: templates.blocks.visualInfo,

    events: {
        'click [data-hook=prevImage]': 'prevImage',
        'click [data-hook=nextImage]': 'nextImage',
        "mousewheel": 'onMouseWheel',
        'DOMMouseScroll': 'onMouseWheel',
    },

    bindings: {
        'model.imgurl': {
            type: 'attribute',
            selector: '[data-hook=carouselImg]',
            name: 'src'
        },
        'model.visible': {
            type: function (el, value, previousValue) {
                el.style.visibility = (value) ? "visible" : "hidden";
            },
            selector: '[data-hook=carouselImg]',

        },
        'model.counter': {
            type: 'text',
            selector: '[data-hook=counter]',
        }
    },

    initialize: function (options) {
        this.model = app.workset.carousel;
        this.listenTo(this.model, "onSelect", _.bind(this.render, this));
        this.el = options.el;
    },

    pack: function (screenHeight, heightPercentage) {
        var headerH = $("#carouselHeader").outerHeight(true);
        var container = Math.floor(screenHeight / 100 * heightPercentage);
        var usable = container - headerH;
        /*changecss("#carouselImageList img", "height", usable+"px");
         changecss("#carouselImageList img", "max-height", usable+"px");*/
        changecss("#carouselContent", "height", usable + "px");
        changecss("#carouselContent img", "max-height", usable + "px");
        return container;
    },

    nextImage: function (event) {
        this.model.nextImage();
        this.testImage();
    },

    prevImage: function (event) {
        this.model.prevImage();
        this.testImage();
    },

    onMouseWheel: function (event) {
        var e = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta > 0) {
            this.prevImage();
        } else if (delta < 0) {
            this.nextImage();
        }
    },

    testImage: function () {
        console.log("testing url", this.el);
        var tester=new Image();
        tester.onload= _.bind(this.imageFound,this);
        tester.onerror=_.bind(this.imageNotFound, this);
        tester.src=this.model.imgurl;
    },

    imageFound: function () {
        console.log("image found");
        this.query(".notFound").classList.add("hidden");
        this.queryByHook("carousel").classList.remove("hidden");
    },

    imageNotFound:function(){
        console.log("image not found");
        this.query(".notFound").classList.remove("hidden");
        this.queryByHook("carousel").classList.add("hidden");
    }


});
