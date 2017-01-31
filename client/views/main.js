var app = require('ampersand-app');
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('../templates');
//var eb = require('../eventbus');
var Sidebar = require('./sidebar');
var Sidebar2 = require('./sidebar2');
var assetManager = require('./assetManager');

module.exports = View.extend({
    template: templates.body,
    //autoRender:true,
    initialize: function () {
        // this marks the correct nav item selected
        this.listenTo(app, 'page', this.handleNewPage);
        //this.sidebar = new Sidebar();
        this.sidebar2 = new Sidebar2();
        this.assetManager = new assetManager();
    },
    events: {
        'click a[href]': 'handleLinkClick'
    },

    render: function () {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate();
        //this.queryByHook('pageSidebar').appendChild(this.sidebar.render().el);
        this.queryByHook('pageSidebar2').appendChild(this.sidebar2.render().el);
        this.queryByHook('pageModals').appendChild(this.assetManager.render().el);

        // init and configure our page switcher

        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || "Webapiner";
                document.scrollTop = 0;

                // add a class specifying it's active
                //dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });
        _.defer($.proxy(this.afterRender, this));
        // setting a favicon for fun (note, it's dynamic)
        return this;
    },

    afterRender: function () {
        $('#pageSidebar').sidebar({
            transition: 'overlay',
            closable: true,
            dimPage: false
        });

        console.log("main rendered");

    },

    handleNewPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleLinkClick: function (e) {
        /*if(!$(e.this).is("a")){
         return;
         }*/
        var aTag = $(e.target).is("i.icon") ? e.target.parentNode : e.target;
        var local = aTag.host === window.location.host;
        //console.log(e, e.target.parentNode, aTag, aTag.host, window.location.host, local);
        //e.preventDefault();
        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && !e.defaultPrevented) {
            e.preventDefault();
            app.navigate(aTag.pathname);
        }
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll("a[data-type='nav']").forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);
            //console.log(path, aPath);
            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag, 'active');
            } else {
                dom.removeClass(aTag, 'active');
            }
        });
    }
});
