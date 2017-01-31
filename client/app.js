var app = require('ampersand-app');
var _ = require('lodash');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var domReady = require('domready');

var rFiles = require('./models/c_remoteFiles');
var assets = require('./models/c_assets');
var tools = require('./models/c_tools');
var Toolkit = require('./models/s_toolkit');

var workset = require('./models/m_workset');

var net = require('./network/interface');

//var eb = require('./eventbus');

var Registry = require('ampersand-registry');
var templates = require('./templates');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

// Extends our main app singleton
app.extend({
    router: new Router(),
    registry: new Registry(),

    //window.text= new iText();
    filesss: new rFiles(),
    assets: new assets(),
    tools: new tools(),
    toolkit: new Toolkit(),
    workset: new workset(),
    templates: templates,

    net: new net(),

    // This is where it all starts
    init: function () {
        setInterval(function () {
            app.trigger("getInitPack")
        }, 3000);

        app.trigger("getInitPack");
        // Create and attach our main view
        this.mainView = new MainView({
            el: document.body
        });
        this.mainView.render();
        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({pushState: true});
    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));
