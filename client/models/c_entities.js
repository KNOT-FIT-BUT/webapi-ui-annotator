var Collection = require('./base/collection');
var Entity = require('./m_entity');


module.exports = Collection.extend({
    model: Entity,
    mainIndex: 'id',
    modelType: 'entities',
    sort_type: ['int', false, 0],

    fromJSON: function (entites, groups, kbrecords) {
        this.reset();
        for (var i in entites) {
            var ent = new Entity(entites[i]);
            ent.id = parseInt(i);
            ent.link_group(groups);
            ent.link_kbrecord(kbrecords);
            //var ent = entites[i];
            this.add(ent, {sort: true});
        }
    },

    comparator: "id"
});