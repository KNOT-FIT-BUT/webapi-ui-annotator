var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'kbrecord',

    props: {
        id: 'number',
        data: 'object',
        isPreferred: ['boolean', false, false]

    },

    derived: {
        bestText: {
            deps: ['data'],
            fn: function () {
                var result = null;
                var fields = ["preferred term", "name", "display term"];
                for (var i in fields) {
                    if ((fields[i] in this.data) && this.data[fields[i]] != "" && this.data[fields[i]] != undefined) {
                        result = this.data[fields[i]];
                        break;
                    }
                }
                return result;
            }
        },

    },

    descPrev: function () {
        if (typeof(this.data.description) == "object") {
            return this.data.description[0];
        } else if (typeof(this.data.description) == "string") {
            return this.data.description.split(".")[0];
        }

    }

});