/*global $*/
// base view for pages
var View = require('ampersand-view');
var _ = require('underscore');
//var key = require('keymaster');


module.exports = View.extend({
    // register keyboard handlers
    registerKeyboardShortcuts: function () {
        /*
         var self = this;
         _.each(this.keyboardShortcuts, function (value, k) {
         // register key handler scoped to this page
         key(k, self.cid, _.bind(self[value], self));
         });
         key.setScope(this.cid);
         */
    },
    unregisterKeyboardShortcuts: function () {
        //key.deleteScope(this.cid);
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

});
