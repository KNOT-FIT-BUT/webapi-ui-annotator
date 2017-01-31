var app = require('ampersand-app');
var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'item',
    props: {
        id: 'number',
        entityID: 'number',
        tags: 'array',
        start: 'number',
        stop: 'number',
        text: 'string',
        type: 'string',
        text_normalized: 'string',
        text_annotated: ['string', false, ""],
        entity_ref: ['object', false, null],
        select: ['boolean', false, false],
        highlight: ['boolean', false, false],
        visible: ['boolean', false, true]
    },


    derived: {
        selected: {
            deps: ['select', 'type'],
            fn: function () {
                return this.select && (this.type != "text")
            }
        },
        highlighted: {
            deps: ['highlight', 'type', 'select'],
            fn: function () {
                return this.highlight && (this.type != "text") && !this.select
            }
        },
        filtered_type: {
            deps: ['visible', 'type'],
            fn: function () {
                return (this.visible) ? this.type : "text";
            }
        },

        show_annotation: {
            deps: ['visible', 'type'],
            fn: function () {
                return this.visible || (this.type == "text")
            },

        },

        groupclass: {
            deps: ['entity_ref', 'visible'],
            fn: function () {
                if (this.entity_ref != null && this.visible)
                    return this.entity_ref.group;
                else
                    return "";
            }
        }
    },


    initialize: function () {
        app.registry.store(this);
        this.on('destroy', function () {
            app.registry.remove(this.getType(), this.getId());
        }, this);


    },

    link_entity: function (entities) {
        if (this.entityID >= 0) {
            this.entity_ref = entities.get(this.entityID);
            this.entity_ref.link_item(this);
        }
    },

    unlink_entity: function () {

    },

    item_selected: function () {
        switch (this.filtered_type) {
            case "text":
                this.trigger("text_selected", this.entity_ref, this.id);
                break;
            case "item":
                this.trigger("item_selected", this.entity_ref, this.id);
                break;
            default:
                ;
        }


    },


    propagateVisibility: function (newState, filterThis) {
        if (filterThis) {
            this.visible = newState;
        } else {
            this.visible = true;
        }
        ;
    }


});