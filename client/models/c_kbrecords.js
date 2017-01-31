var Collection = require('./base/collection');
var kbrecord = require('./m_kbrecord');


module.exports = Collection.extend({
    model: kbrecord,
    mainIndex: 'id',


    fromJSON: function (kbrec) {
        this.reset();
        for (var i in kbrec) {
            this.add({id: parseInt(i), data: kbrec[i]});
        }
    }

});