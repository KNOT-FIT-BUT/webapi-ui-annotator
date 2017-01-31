var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'group',
    props: {
        prefix: 'string',
        dataPlus: 'object',
        name: 'string',
        entity_ref: ['object', false, function () {
            return new Object
        }],
        visible: ['boolean', false, true]
    },

    derived: {
        groupclass: {
            deps: ['entity_ref', 'enabled'],
            fn: function () {
                if (this.enabled)
                    return "bg-" + this.prefix
                else
                    return "fg-" + this.prefix
            }
        }
    },


    link_entity: function (entity) {
        this.entity_ref[entity.id] = entity;
    },

    propagateVisibility: function (withEntities, withItems) {
        for (var k in this.entity_ref) {
            this.entity_ref[k].propagateVisibility(this.visible, withEntities, withItems);
        }

    },


    toggleVisibility: function (withEntities, withItems) {
        this.visible = !this.visible;
        this.propagateVisibility(withEntities, withItems);
    }


});