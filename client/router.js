var app = require('ampersand-app');
var Router = require('ampersand-router');

var Preview = require('./pages/preview');
var Annotator = require('./pages/annotator');
var Settings = require('./pages/settings');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'preview': 'home',
        'annotator': 'annotator',
        'settings': 'settings',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new Preview());
    },

    annotator: function () {
        app.trigger('page', new Annotator());
    },

    settings: function () {
        app.trigger('page', new Settings());
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
