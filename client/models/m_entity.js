var app = require('ampersand-app');
var _ = require('underscore');
var AmpersandModel = require('./base/model');
//var eb = require('../eventbus');

module.exports = AmpersandModel.extend({
    modelType: 'entity',
    props: {
        id: 'number',
        group: 'string',
        preferred: 'number',
        others: 'array',
        items: 'array',
        item_selected: ['number', false, -1],

        items_ref: ['object', false, Object],
        kb_ref: ['object', false, Object],
        group_ref: ['object', false, null],
        select: ['boolean', false, false],
        kb_preview: ['number', false, -1],
        visible: ['boolean', false, true],
    },


    derived: {
        bestText: {
            deps: ['kb_ref', 'preferred', 'items_ref'],
            fn: function () {
                var result = "";
                if (this.preferred != null) {
                    return this.kb_ref[this.preferred].bestText;
                } else {
                    result = this.items_ref[this.items[0]].text;
                }
                return result;
            }
        },

        selected: {
            deps: ['select', 'item_selected'],
            fn: function () {
                return this.select || (this.item_selected >= 0);
            }
        },

        coref: {
            deps: ['item_selected'],
            fn: function () {
                var y = "";
                if (this.item_selected >= 0) {
                    y = (this.items_ref[this.item_selected].tags.length > 0) ? (" [" + this.items_ref[this.item_selected].tags[0] + "] " ) : "";

                }
                return y;
            }
        }
    },

    initialize: function () {
        //this.listenTo(eb, "kbpreview", _.bind(this.onKBpreview, this));
    },

    item_higlight: function (item_selected) {
        this.select = true;
        this.item_selected = item_selected;
        this.items_ref[item_selected].select = true;
        //this.items_ref[item_selected].scrollTo();
        for (var i in this.items_ref) {
            this.items_ref[i].highlight = true;
        }
    },

    update_highlight: function (item_selected) {
        this.items_ref[this.item_selected].select = false;
        this.items_ref[item_selected].select = true;
        this.item_selected = item_selected;
    },

    item_deselect: function () {
        this.item_selected = -1;
        for (var i in this.items_ref) {
            this.items_ref[i].highlight = false;
            this.items_ref[i].select = false;
        }
        this.select = false;
    },


    link_item: function (item) {
        //console.log("linking item to entity",item.id, this.items);
        this.items_ref[item.id] = item;
    },

    link_group: function (groups) {
        this.group_ref = groups.get(this.group);
        this.group_ref.link_entity(this);

    },

    link_kbrecord: function (kbr) {
        if (this.preferred != null) {

            if (!(this.preferred in this.others)) {
                this.kb_ref[this.preferred] = kbr.get(this.preferred);
            }
            for (var i in this.others) {
                this.kb_ref[this.others[i]] = kbr.get(this.others[i]);
            }
            this.kb_ref[this.preferred].isPreferred = true;
        }
    },

    entity_selected: function () {
        var item_id;
        if (this.item_selected >= 0) {
            var pos = (this.items.indexOf(this.item_selected) + 1) % this.items.length;
            var item_id = this.items[pos];
        }
        else {
            item_id = this.items[0];
        }
        this.trigger("item_selected", this, item_id);
    },


    get_KBpref_ref: function () {
        if (this.preferred != null) {
            return this.kb_ref[this.preferred];
        } else {
            return null;
        }
    },


    set_KBpreferred: function (kbid) {
        this.kb_ref[this.preferred].isPreferred = false;
        this.preferred = kbid;
        this.kb_ref[this.preferred].isPreferred = true;
    },

    get_Selected_item: function () {
        if (this.item_selected > -1) {
            return this.items_ref[this.item_selected];
        }
        else {
            return null;
        }
    },

    get_item: function (id) {
        return this.items_ref[id];
    },

    onKBpreview: function (data) {
        if (data.arg != null) {
            this.kb_preview = data.arg;
        } else {
            var old_preferred = this.preferred;
            var old_pref_ref = this.pre


        }

    },


    propagateVisibility: function (newState, filterThis, withItems) {
        if (filterThis) {
            this.visible = newState;
        } else {
            this.visible = true;
        }
        ;
        for (var i in this.items_ref) {
            this.items_ref[i].propagateVisibility(newState, withItems);

        }

    }


});