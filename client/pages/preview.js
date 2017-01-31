var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('./base');
var templates = require('../templates');
var Editor = require('./blocks/editor');
var EditorMenu = require('./blocks/editorMenu');
var EntityInfo = require('./blocks/entityInfo');
var EntityList = require('./blocks/entityList');
var VisualInfo = require('./blocks/visualInfo');
var EntityFilter = require('./blocks/entityFilter');

module.exports = PageView.extend({
    pageTitle: 'Annotation preview',
    template: templates.pages.preview,
    subviews: {
        editorMenu: {
            container: '[data-hook=menu]',
            constructor: EditorMenu
        },
        editor: {
            container: '[data-hook=editor]',
            constructor: Editor
        },
        entityList: {
            container: '[data-hook=entityList]',
            constructor: EntityList
        },
        entityInfo: {
            container: '[data-hook=entityInfo]',
            constructor: EntityInfo
        },
        visualInfo: {
            container: '[data-hook=visualInfo]',
            constructor: VisualInfo
        },
        entityFilter: {
            container: '[data-hook=previewPopups]',
            constructor: EntityFilter
        }


    },
    initialize: function (option) {
        // this marks the correct nav item selected
        /* this.editor = new Editor();
         this.editorMenu = new EditorMenu();
         this.entityList = new EntityList();
         this.entityInfo = new EntityInfo();
         this.visualInfo = new VisualInfo();*/
        //TODO: WTF?
        this.iText = app.registry.lookup('text');

    },
    events: {
        'click #leftTop': 'handleRemoveClick'

    },
    render: function () {

        this.renderWithTemplate();
        /*
         this.queryByHook('leftColumn').appendChild(this.editorMenu.render().el);
         this.queryByHook('leftColumn').appendChild(this.editor.render().el);
         this.queryByHook('leftColumn').appendChild(this.entityList.render().el);
         this.queryByHook('rightColumn').appendChild(this.entityInfo.render().el);
         this.queryByHook('rightColumn').appendChild(this.visualInfo.render().el);
         */


        _.defer($.proxy(this.afterRender, this));

        return this;
    },

    afterRender: function () {
        //console.log(this);

        var pageWidth = window.innerWidth,
            pageHeight = window.innerHeight;
        if (typeof pageWidth != "number") {
            if (document.compatMode == "CSS1Compat") {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = document.body.clientHeight;
            }
        }
        pageHeight -= $("#headerMenu").outerHeight();
        var editorMenuH = $(this.editorMenu.el).outerHeight(),
            editorH = this.editor.pack(pageHeight, 55, editorMenuH),
            entityListH = this.entityList.pack(pageHeight, 45),
            entityInfoH = this.entityInfo.pack(pageHeight, 55),
            visualInfoH = this.visualInfo.pack(pageHeight, 45);

        changecss("#leftBottom", "height", entityListH + "px");
        changecss("#leftBottom", "max-height", entityListH + "px");

        changecss("#rightTop", "height", entityInfoH + "px");
        changecss("#rightTop", "max-height", entityInfoH + "px");

        changecss("#rightBottom", "height", visualInfoH + "px");
        changecss("#rightBottom", "max-height", visualInfoH + "px");


        /*

         */
    },

    handleRemoveClick: function () {
        console.log("click");
    }
});
