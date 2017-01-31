var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'remoteFile',
    props: {
        id: 'number',
        name: 'string'
    }


});