var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Annotation preview',
    template: templates.pages.settings,
    initialize: function (option) {
        // this marks the correct nav item selected

    },
    events: {},
    render: function () {
        this.renderWithTemplate();

        return this;
    }


});
/**
 * Created by Casey on 7.10.2014.
 */
