var app = require('ampersand-app');
var _ = require('underscore');
var AmpersandModel = require('./base/model');
var EntitiesCollection = require('./c_entities');
var GroupCollection = require('./c_groups');
var ItemsCollection = require('./c_items');
var KBrecordsCollection = require('./c_kbrecords');
var Carousel = require('./m_carousel');
var FilteredCollection = require('ampersand-filtered-subcollection');

module.exports = AmpersandModel.extend({
    modelType: 'workset',
    props: {
        empty: ['boolean', false, true],
        entitySelected: 'object',
        update: ['int', false, 0],
        sourceText: ['string', false, ""],
        sourceTextSelection: ['object', false, null],
        carousel: ['object', false, null],
        editor_filter: ['boolean', false, true],
        entities_filter: ['boolean', false, true],
        sort_type: ['int', false, 0],
        cursorPos: ['int', false, 0]
    },

    session: {},

    collections: {
        entities: EntitiesCollection,
        groups: GroupCollection,
        items: ItemsCollection,
        kbrecords: KBrecordsCollection


    },

    derived: {

        tokens: {
            deps: ['entities', 'sourceText'],
            fn: function () {
                var result = [];
                return result;
            }
        },
        sortIcon: {
            deps: ['sort_type'],
            fn: function () {
                switch (this.sort_type) {
                    case 0:
                        return "sort icon";
                        break;
                    case 1:
                        return "sort alphabet ascending icon";
                        break;
                    case 2:
                        return "sort alphabet descending icon";
                        break;
                    default:
                        break;
                }
            }
        }

    },

    initialize: function () {
        var self = this;
        this.entitySelected = null;
        this.carousel = new Carousel;
        //this.on("change:sourceText", function(){console.log("text changed");self.trigger("refresh")});
        this.listenTo(app, "kbsetpreferred", _.bind(this.kbsetpreferred, this));
        this.listenTo(app, "ent:filter", _.bind(this.filter_data, this))
    },


    fromJSON: function (data, mods) {
        var offset = (mods.offset) ? parseInt(mods.offset) : 0;

        console.log("updating workset from json", offset, mods);
        this.colevent_off();
        this.groups.fromJSON(data['groups']);
        this.kbrecords.fromJSON(data['kb_records']);

        this.entities.fromJSON(data['entities'], this.groups, this.kbrecords);
        //this.items.fromJSON(data['items']);
        this.items.tokenize(data['items'], this.sourceText, this.entities, offset);

        this.colevent_on();
        this.empty = false;
        this.trigger("refresh");
    },

    filter_data: function (param) {
        console.log(param);
        this.groups.get(param).toggleVisibility(this.entities_filter, this.editor_filter);
    },

    colevent_off: function () {
        this.entities.off();
        this.groups.off();
        this.items.off();
        this.kbrecords.off();
    },

    colevent_on: function () {
        var self = this;
        //this.entities.on("change:item_selected", function(a,b){console.log("entities", a,b)});
        //this.entities.on("change:item_selected", _.bind(this.select, this));
        this.items.on("item_selected", _.bind(this.item_select, this));
        this.items.on("text_selected", _.bind(this.text_select, this));
        this.entities.on("item_selected", _.bind(this.entity_select, this));
        //this.groups.on("all", function(a,b){console.log("groups",a,b)});
        //this.items.on("change:select", function(a,b){console.log("items",a,b)});
        //this.kbrecords.on("all", function(a,b){console.log("kbr",a,b)});
        //this.update++;
    },


    item_select: function (entity, source) {
        if (entity == this.entitySelected) {
            this.entitySelected.update_highlight(source);
        } else {
            this.deselect();
            this.entitySelected = entity;
            this.entitySelected.item_higlight(source);
            this.carousel.setImages(entity);
        }
        this.trigger("onSelect");

        //this.trigger("refresh");

    },

    entity_select: function (entity, source) {
        entity.get_item(source).trigger("scrollTo");
        this.item_select(entity, source);
    },

    text_select: function () {
        this.deselect();
        this.trigger("onSelect");
        this.carousel.clear();
    },


    deselect: function () {
        if (this.entitySelected != null) {
            this.entitySelected.item_deselect();
        }
        this.entitySelected = null;
    },

    kbsetpreferred: function (data) {
        if (this.entitySelected != null) {
            this.entitySelected.set_KBpreferred(data.arg);
        }
    },


    updateTextModel: function (text, silent) {
        this.sourceText = text;
        if (!silent) {
            this.trigger("refresh");
        }
    },

    toggleScope: function (scope) {
        switch (scope) {
            case 'editor':
                this.editor_filter = !this.editor_filter

                break;
            case 'entities':
                this.entities_filter = !this.entities_filter

                break;
            default:
                break;
        }
        for (var i = 0; i < this.groups.length; i++) {
            this.groups.at(i).propagateVisibility(this.entities_filter, this.editor_filter);
        }
    },

    cycleSort: function () {
        this.sort_type = (this.sort_type + 1) % 3;
        switch (this.sort_type) {
            case 0:
                this.entities.comparator = "id";
                break;
            case 1:
                this.entities.comparator = function (model1, model2) {
                    var upA = model1.bestText.toUpperCase();
                    var upB = model2.bestText.toUpperCase();
                    return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
                }
                break;
            case 2:
                this.entities.comparator = function (model1, model2) {
                    var upA = model1.bestText.toUpperCase();
                    var upB = model2.bestText.toUpperCase();
                    return (upA < upB) ? 1 : (upA > upB) ? -1 : 0;
                }
                break;
        }
        //this.entities.comparator = strfnc;
        this.entities.sort();
        this.trigger("refresh");
    }


});
