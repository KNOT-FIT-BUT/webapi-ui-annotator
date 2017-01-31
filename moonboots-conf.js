var config = require('getconfig');
var templatizer = require('templatizer');
var _ = require('underscore');

var appDir = __dirname + '/client';
var cssDir = __dirname + '/stylesheets';
var jsDir = __dirname + '/libraries';

module.exports = function (obj) {
    return _.extend({
       // The base name of the javascript file served in the <script src="the_name.*.js">
        jsFileName: 'webapiner',
        // The base name of the javascript file served in the <link rel="stylesheet" src="the_name.*.js">
        cssFileName: 'webapiner',
        main: appDir + '/app.js',
        developmentMode: config.isDev,
        // Specify any non-commonjs libraries we wish to include.
        // You can think of this as your list of <script> tags in your HTML.
        // These will simply be included before any of your application code in the
        // order you provide them. So for example, if you're using jQuery make sure
        // you list any plugins after jQuery itself.
        libraries: [
        	jsDir + '/jquery-2.1.4.js',
            jsDir + '/changeCSS.js',
        	jsDir + '/semantic.js'
        ],
        // Specify the stylesheets we want to bundle
        stylesheets: [
            cssDir + '/semantic.css',
            cssDir + '/webapi.css'
        ],
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(__dirname + '/templates', appDir + '/templates.js');
            }
        },
        beforeBuildCSS: function (done) {
            // We only want to do this in dev mode. If it's not in dev mode, this
            // function will only be run once.
            if (!config.isDev) {
                done();
                return;
            }
            // Re-compile stylus to css each time the app's main css file is requested.
            // In addition there's a "watch" option that will make stylizer also be able
            // to talk to livereaload (http://livereload.com/) browser plugins for sneakily
            // refreshing styles without waiting for you to refresh or running/configuring
            // the live reload app.
            done();
        }
    }, obj);
};