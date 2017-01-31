var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: "text",
    props: {
        text: ['string', false, ""]
    },

    substring: function (start, stop) {
        return this.text.substring(start, stop);
    }


});
