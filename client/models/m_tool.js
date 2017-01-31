var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'tool',

    props: {
        id: 'number',
        name: 'string',
        params: 'array',
        version: 'string',
        selected: ['bool', false, false],
        switches: ['object', false, function(){return new Object()}]
    },



    derived: {
        nameNormalized: {
            deps: ['name'],
            fn: function () {
                return this.name.toUpperCase();

            }
        },
        stateColor: {
            deps: ['selected'],
            fn: function () {
                return (this.selected) ? 'blue' : ''

            }
        }
    },


    initialize:function(attrs, options){
        for(var i in this.params){
            var key = this.params[i];
            this.switches[key] = false;
        }
    }

});