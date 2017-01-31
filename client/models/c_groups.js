var Collection = require('./base/collection');
var Group = require('./m_group');


module.exports = Collection.extend({
    model: Group,
    mainIndex: 'prefix',


    fromJSON: function (entites) {
        this.reset();
        for (var i in entites) {
            var ent = entites[i];
            ent.prefix = i;
            this.add(ent);
        }
    }

});