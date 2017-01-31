var AmpersandModel = require('ampersand-model');

var EntitiesCollection = require('./c_entities');
var GroupCollection = require('./c_groups');
var ItemsCollection = require('./c_items');
var KBrecordsCollection = require('./c_kbrecords');

module.exports = AmpersandModel.extend({
    props: {
        empty: ['boolean', false, true],
        entitySelected: 'object',
        update: 'int'
    },

    collections: {
        entities: EntitiesCollection,
        groups: GroupCollection,
        items: ItemsCollection,
        kbrecords: KBrecordsCollection
    },

    derived: {},

    initialize: function () {
        //console.log("AAAAAyolooooooooooooooooooooo", this.tools, this.assets);
        var self = this;
        this.entitySelected = null;
        //this.tools.on("change", function(a,b){console.log("yolooooooooooooooooooooo", self.updated++)});
        //this.assets.on("change", function(a,b){console.log("yolooooooooooooooooooooo", self.updated++)});
    },

    fromJSON: function (data) {
        this.colevent_off();
        this.entities.fromJSON(data['entities']);
        this.groups.fromJSON(data['groups']);
        this.items.fromJSON(data['items']);
        this.kbrecords.fromJSON(data['kb_records']);
        this.colevent_on();
        this.empty = false;
    },

    colevent_off: function () {
        this.entities.off();
        this.groups.off();
        this.items.off();
        this.kbrecords.off();
    },

    colevent_on: function () {

    },

    select: function (entityID) {
        this.deselect()
        var entity = this.entities.get(entityID)
        this.entitySelected = entity;
        for (var e in entity.items) {
            var item = this.items.get(e);
            item.selected = true;
            console.log(item.text);
        }
        this.update++;
    },

    deselect: function () {
        if (this.entitySelected != null) {
            for (var e in this.entitySelected.items) {
                this.items.get(e).selected = false;
            }
            this.entitySelected.selected = false;
        }
    }


});
