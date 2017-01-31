var app = require('ampersand-app');
var _ = require('underscore');
var View = require('ampersand-view');
var templates = require('../templates');
//var eb = require('../eventbus');
var KBRecords = require('../models/c_kbrecords');
var kblistitem = require('../pages/blocks/kblistitem')

module.exports = View.extend({
    template: templates.sidebars.kblist,

    events: {
        "mouseleave": "resetKBprev"

    },

    initialize: function (options) {
        View.prototype.initialize.apply(this, arguments);
        this.model = app.workset;
        this.listenTo(this.model, "change:entitySelected", _.bind(this.render, this));
        this.kbsubcollection = new KBRecords();
    },

    render: function () {
        this.renderWithTemplate();
        this.kbsubcollection.reset();
        if (this.model.entitySelected != null) {
            this.kbsubcollection.add(this.model.entitySelected.get_KBpref_ref());
            for (var kbid in this.model.entitySelected.kb_ref) {
                if (kbid != this.model.entitySelected.preferred) {
                    this.kbsubcollection.add(this.model.entitySelected.kb_ref[kbid]);
                }
            }

            this.renderCollection(this.kbsubcollection, kblistitem, this.queryByHook('kbprev'));
        }
        return this;
    },


    resetKBprev: function () {

    }


});
