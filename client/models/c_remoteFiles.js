var Collection = require('./base/collection');
var File = require('./m_remoteFile');


module.exports = Collection.extend({
    model: File,


    fromJSON: function (data) {
        this.reset();
        for (var i in data) {
            this.add({name: data[i]});
        }
    }


});

