var app = require('ampersand-app');
var _ = require('underscore');
var PageView = require('../base');
var templates = require('../../templates');
var EditorItem = require('./editorItem')
//var eb = require('../../eventbus');

module.exports = PageView.extend({
    template: templates.blocks.editor,


    events: {
        'input [data-hook=editor]': 'updateTextModel',
        'mouseup [data-hook=editor]': 'updateTextSelection',
        'click [data-hook=editor]': 'positionTest'


    },

    bindings: {},

    initialize: function (options) {
        var self = this;
        this.el = options.el;
        this.model = app.workset;
        //this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "refresh", _.bind(this.render, this));
        this.listenTo(app, "scrollTo", _.bind(this.scrollTo, this));
        this.listenTo(app, "annotate annotateSelection", _.bind(this.showDimmer, this));

    },


    pack: function (screenHeight, heightPercentage, offset) {
        //var headerH = this.header.outerHeight(false);
        var container = Math.floor(screenHeight / 100 * heightPercentage) - offset;
        changecss("#editorBlock", "height", container + "px");
        changecss("#editorBlock", "max-height", container + "px");
        return container;
    },


    render: function () {
        this.renderWithTemplate();
        if (this.model.items.length > 0) {
            console.log("rendering collectoin", this.model.items, EditorItem, this.queryByHook('editor'));
            this.renderCollection(this.model.items, EditorItem, this.queryByHook('editor'));
        } else {
            this.queryByHook('editor').innerHTML = this.model.sourceText;
        }

        _.defer($.proxy(this.afterRender, this));
        return this;
    },

    afterRender: function () {
        $("#editorBlock").dimmer({"closable": false, duration: {show: 10, hide: 510}});
        this.hideDimmer();
    },

    updateTextModel: function () {
        console.log("model update on input event");
        var element = this.queryByHook('editor');
        //console.log(element.innerText || element.textContent);
        var text = element.innerText || element.textContent;
        this.model.updateTextModel(text, true);
        //this.render();
    },


    updateTextSelection: function (event) {
        var sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                console.log("0selection at", sel, sel.getRangeAt(0));
                this.model.sourceTextSelection = sel.getRangeAt(0);
            }
        } else if (document.selection) {
            console.log("0selection at", document.selection.createRange());
            this.model.sourceTextSelection = document.selection.createRange();
        } else {
            this.model.sourceTextSelection = null;
        }
        console.log(window.getSelection().getRangeAt(0).startOffset);

    },

    scrollTo: function (item) {
        var y = this.queryByHook('editor');

        var offset = item.arg.el.offsetTop - y.scrollTop;
        console.log(item.arg.el.offsetTop, y.scrollTop, offset, y.offsetHeight);
        if (Math.abs(offset) > y.offsetHeight || offset < 0) {
            y.scrollTop = item.arg.el.offsetTop;
        }

    },

    showDimmer: function () {
        $("#editorBlock").dimmer("show");
    },

    hideDimmer: function () {
        $("#editorBlock").dimmer("hide");
    },

    positionTest: function (event) {
        var element = this.queryByHook('editor');
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        console.log(caretOffset);
        this.model.cursorPos = caretOffset;
    }


});
