var app = require('ampersand-app');
var _ = require('underscore');
var AmpersandModel = require('./base/model');
//var eb = require('../eventbus');

module.exports = AmpersandModel.extend({
    modelType: 'carousel',
    props: {
        images: ['array', false, Array],
        active_image: ['number', false, 0],
        base_url: ['string', false, ""],
        kb_ref: ['object', false, null],
        entity: ['object', false, null],
    },

    derived: {
        imgurl: {
            deps: ['images', 'active_image', 'base_url'],
            fn: function () {
                if (this.images.length > 0) {
                    return this.base_url + this.images[this.active_image];
                } else {
                    return "";
                }
            }
        },
        visible: {
            deps: ['images'],
            fn: function () {
                return this.images.length > 0;
            }
        },
        imgCurrent: {
            deps: ['images'],
            fn: function () {
                return (this.images.length > 0) ? this.active_image + 1 : "-"
            }
        },
        imgTotal: {
            deps: ['images'],
            fn: function () {
                return this.images.length || "-"
            }
        },
        counter: {
            deps: ['images', 'active_image'],
            fn: function () {
                if (this.images.length > 0) {
                    return this.active_image + 1 + "/" + this.images.length;
                } else {
                    return "-/-";
                }
            }
        }


    },

    initialize: function () {
        this.listenTo(app, "kbpreview", _.bind(this.onKBpreview, this));
    },


    nextImage: function () {
        if (this.images.length > 0) {
            this.active_image = (++this.active_image) % this.images.length;
        }

    },
    prevImage: function () {
        if (this.images.length > 0) {
            this.active_image = (this.active_image - 1 < 0 ) ? this.images.length - 1 : this.active_image - 1;
        }
    },

    setImages: function (entity) {
        this.entity = entity;
        this.kb_ref = entity.get_KBpref_ref();
        this.dataplus = entity.group_ref.dataPlus;

        this.__setImages();
        console.log(this.images, this.base_url, this.dataplus);
    },

    __setImages: function () {
        this.active_image = 0;
        if (this.kb_ref != null && this.kb_ref.data.image != "") {
            this.images = this.kb_ref.data.image;
            if (this.dataplus) {
                this.base_url = ("image" in this.dataplus) ? this.dataplus.image.data : "";
            }
        } else {
            this.images = new Array();
            this.base_url = "";
        }
    },

    onKBpreview: function (kbid) {
        if (kbid.arg != null) {
            this.kb_ref = this.entity.kb_ref[kbid.arg];
        } else {
            this.kb_ref = this.entity.get_KBpref_ref();
        }
        this.__setImages();

    }


})
