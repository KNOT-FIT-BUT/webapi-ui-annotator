(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade = function () {
        function n(n) {
            return null != n && "" !== n
        }

        function t(e) {
            return (Array.isArray(e) ? e.map(t) : e && "object" == typeof e ? Object.keys(e).filter(function (n) {
                return e[n]
            }) : [e]).filter(n).join(" ")
        }

        function e(n) {
            return i[n] || n
        }

        function r(n) {
            var t = String(n).replace(o, e);
            return t === "" + n ? n : t
        }

        var a = {};
        a.merge = function s(t, e) {
            if (1 === arguments.length) {
                for (var r = t[0], a = 1; a < t.length; a++)r = s(r, t[a]);
                return r
            }
            var i = t["class"], o = e["class"];
            (i || o) && (i = i || [], o = o || [], Array.isArray(i) || (i = [i]), Array.isArray(o) || (o = [o]), t["class"] = i.concat(o).filter(n));
            for (var f in e)"class" != f && (t[f] = e[f]);
            return t
        }, a.joinClasses = t, a.cls = function (n, e) {
            for (var r = [], i = 0; i < n.length; i++)e && e[i] ? r.push(a.escape(t([n[i]]))) : r.push(t(n[i]));
            var o = t(r);
            return o.length ? ' class="' + o + '"' : ""
        }, a.style = function (n) {
            return n && "object" == typeof n ? Object.keys(n).map(function (t) {
                return t + ":" + n[t]
            }).join(";") : n
        }, a.attr = function (n, t, e, r) {
            return "style" === n && (t = a.style(t)), "boolean" == typeof t || null == t ? t ? " " + (r ? n : n + '="' + n + '"') : "" : 0 == n.indexOf("data") && "string" != typeof t ? (-1 !== JSON.stringify(t).indexOf("&") && console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"), t && "function" == typeof t.toISOString && console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0"), " " + n + "='" + JSON.stringify(t).replace(/'/g, "&apos;") + "'") : e ? (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + n + '="' + a.escape(t) + '"') : (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + n + '="' + t + '"')
        }, a.attrs = function (n, e) {
            var r = [], i = Object.keys(n);
            if (i.length)for (var o = 0; o < i.length; ++o) {
                var s = i[o], f = n[s];
                "class" == s ? (f = t(f)) && r.push(" " + s + '="' + f + '"') : r.push(a.attr(s, f, !1, e))
            }
            return r.join("")
        };
        var i = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}, o = /[&<>"]/g;
        return a.escape = r, a.rethrow = function f(n, t, e, r) {
            if (!(n instanceof Error))throw n;
            if (!("undefined" == typeof window && t || r))throw n.message += " on line " + e, n;
            try {
                r = r || require("fs").readFileSync(t, "utf8")
            } catch (a) {
                f(n, null, e)
            }
            var i = 3, o = r.split("\n"), s = Math.max(e - i, 0), l = Math.min(o.length, e + i), i = o.slice(s, l).map(function (n, t) {
                var r = t + s + 1;
                return (r == e ? "  > " : "    ") + r + "| " + n
            }).join("\n");
            throw n.path = t, n.message = (t || "Jade") + ":" + e + "\n" + i + "\n\n" + n.message, n
        }, a.DebugItem = function (n, t) {
            this.lineno = n, this.filename = t
        }, a
    }();

    var templatizer = {};
    templatizer["blocks"] = {};
    templatizer["includes"] = {};
    templatizer["modals"] = {};
    templatizer["pages"] = {};
    templatizer["sidebars"] = {};
    templatizer["tmp"] = {};
    templatizer["widgets"] = {};

    // blocks/EditorItem.jade compiled template
    templatizer["blocks"]["EditorItem"] = function tmpl_blocks_EditorItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            switch (model.type) {
                case "text":
                    buf.push('<span class="item">' + jade.escape((jade_interp = model.text) == null ? "" : jade_interp) + "</span>");
                    break;

                case "item":
                    buf.push("<strong" + jade.attr("data-id", "" + model.id + "", true, false) + ' class="item">' + jade.escape((jade_interp = model.text) == null ? "" : jade_interp) + "</strong>");
                    break;

                default:
                    buf.push('""');
                    break;
            }
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/assetItem.jade compiled template
    templatizer["blocks"]["assetItem"] = function tmpl_blocks_assetItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            buf.push('<a data-hook="asset"' + jade.attr("data-id", "" + model.id + "", true, false) + ' class="ui label"><i class="pref_icon"></i><span class="name">' + jade.escape((jade_interp = model.name) == null ? "" : jade_interp) + '</span><i class="suff_icon"></i></a>');
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/editor.jade compiled template
    templatizer["blocks"]["editor"] = function tmpl_blocks_editor() {
        return '<div id="editorBlock" class="ui dimmable "><div class="ui dimmer"><div id="editorBlockDimmerText" class="ui text loader">Processing...</div></div><pre id="editorItem" contentEditable="true" spellcheck="false" lang="en" data-hook="editor"></pre></div>';
    };

    // blocks/editorMenu.jade compiled template
    templatizer["blocks"]["editorMenu"] = function tmpl_blocks_editorMenu() {
        return '<div id="previewMenu"><div id="editorHeader" class="ui tiered menu"><div class="menu"><a data-tab="annotate" class="active item"><i class="lab icon"></i>Annotate</a><a data-tab="save" class="item"><i class="save icon"></i>Save</a><a data-tab="manage" class="item"><i class="content basic icon"></i>Manage</a><div class="right menu"><a data-hook="button" data-action="quickBtn" class="item nonebtn"><i class="mail icon"></i>Quick Test Button</a></div></div><div data-tab="annotate" class="ui small secondary menu active tab"><a data-hook="button" data-action="annotate" class="item">Annotate</a><a data-hook="button" data-action="annotateSelection" class="item">Annotate Selected</a><a data-hook="button" data-action="loadLocalFile" class="item"><i class="icon disk outline"></i>Local File</a><div data-hook="dropBase" class="ui dropdown link item"><i class="cloud download icon"></i><div class="text">Example Files</div><i class="icon dropdown"></i><div data-hook="dropItems" class="menu"></div></div></div><div data-tab="save" class="ui small secondary menu tab"><a data-hook="button" data-action="saveJSON" data-arg="json" class="item">JSON</a><a data-hook="button" data-action="saveXML" data-arg="xml" class="item">XML</a><a data-hook="button" data-action="saveYAMLt" data-arg="yaml" class="item">YAML</a></div><div data-tab="manage" class="ui small secondary menu tab"><a data-hook="button" data-action="manageEntities" class="item">Entities</a><a data-hook="button" data-action="showToolkit" class="item">Assets &amp; Tools</a><a data-hook="button" data-action="manageImages" class="item">Images</a></div></div></div>';
    };

    // blocks/entityInfo.jade compiled template
    templatizer["blocks"]["entityInfo"] = function tmpl_blocks_entityInfo(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (Array, model, preview, undefined) {
            buf.push('<div id="rightTop"><div id="entityInfoHeader" class="ui inverted teal menu"><div class="title item"><i class="info icon"> </i>Textual Entity Information</div><div class="icon menu right">');
            var disabled = model.entitySelected && model.entitySelected.others && model.entitySelected.others.length > 1 ? "" : "disabled";
            buf.push('<a data-hook="showBar"' + jade.cls(["item " + disabled + ""], [true]) + '><i class="list layout icon"></i></a></div></div><div id="entityInfoContent">');
            if (model.entitySelected != null && model.entitySelected.preferred != null) {
                var kbid = preview || model.entitySelected.preferred;
                var kb = model.entitySelected.kb_ref[kbid];
                buf.push("<ul>");
                (function () {
                    var $obj = kb.data;
                    if ("number" == typeof $obj.length) {
                        for (var column = 0, $l = $obj.length; column < $l; column++) {
                            var data = $obj[column];
                            if (data != "" && data != null) {
                                buf.push(templatizer["blocks"]["entityInfo"]["kbrow"](column, data, model.entitySelected));
                            }
                        }
                    } else {
                        var $l = 0;
                        for (var column in $obj) {
                            $l++;
                            var data = $obj[column];
                            if (data != "" && data != null) {
                                buf.push(templatizer["blocks"]["entityInfo"]["kbrow"](column, data, model.entitySelected));
                            }
                        }
                    }
                }).call(this);
                buf.push("</ul>");
            }
            buf.push("</div></div>");
        }).call(this, "Array" in locals_for_with ? locals_for_with.Array : typeof Array !== "undefined" ? Array : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "preview" in locals_for_with ? locals_for_with.preview : typeof preview !== "undefined" ? preview : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // blocks/entityInfo.jade:finalize compiled template
    templatizer["blocks"]["entityInfo"]["finalize"] = function tmpl_blocks_entityInfo_finalize(data) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("" + ((jade_interp = data.replace(/\\n/g, "<br />")) == null ? "" : jade_interp) + "");
        return buf.join("");
    };


    // blocks/entityInfo.jade:gender compiled template
    templatizer["blocks"]["entityInfo"]["gender"] = function tmpl_blocks_entityInfo_gender(g) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        switch (g) {
            case "M":
                buf.push(jade.escape(null == (jade_interp = "Male") ? "" : jade_interp));
                break;

            case "F":
                buf.push(jade.escape(null == (jade_interp = "Female") ? "" : jade_interp));
                break;

            case "U":
                buf.push(jade.escape(null == (jade_interp = "Unknown") ? "" : jade_interp));
                break;

            case "O":
                buf.push(jade.escape(null == (jade_interp = "Others") ? "" : jade_interp));
                break;
        }
        return buf.join("");
    };


    // blocks/entityInfo.jade:kbrowdata compiled template
    templatizer["blocks"]["entityInfo"]["kbrowdata"] = function tmpl_blocks_entityInfo_kbrowdata(column, data, dataplus, coref) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        if (dataplus != null && dataplus.hasOwnProperty(column)) {
            var dplus = dataplus[column];
            switch (dplus.type) {
                case "url":
                    buf.push("<a" + jade.attr("href", "" + dplus.data + "" + data + "", true, false) + ' target="_blank">');
                    buf.push(templatizer["blocks"]["entityInfo"]["finalize"](data));
                    buf.push("</a>");
                    break;

                case "image":
                    buf.push("<a" + jade.attr("href", "" + dplus.data + "" + data + "", true, false) + ' target="_blank">');
                    buf.push(templatizer["blocks"]["entityInfo"]["finalize"](data));
                    buf.push("</a>");
                    break;

                default:
                    buf.push(templatizer["blocks"]["entityInfo"]["finalize"](data));
                    break;
            }
        } else {
            switch (column) {
                case "type":
                    buf.push("" + jade.escape((jade_interp = data) == null ? "" : jade_interp) + '<span class="coref"></span>');
                    break;

                case "gender":
                    buf.push(templatizer["blocks"]["entityInfo"]["gender"](data));
                    break;

                default:
                    if (column.endsWith("url")) {
                        buf.push("<a" + jade.attr("href", "" + data + "", true, false) + ' target="_blank">');
                        buf.push(templatizer["blocks"]["entityInfo"]["finalize"](data));
                        buf.push("</a>");
                    } else {
                        buf.push(templatizer["blocks"]["entityInfo"]["finalize"](data));
                    }
                    break;
            }
        }
        return buf.join("");
    };


    // blocks/entityInfo.jade:kbrow compiled template
    templatizer["blocks"]["entityInfo"]["kbrow"] = function tmpl_blocks_entityInfo_kbrow(column, data, entity) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<li><strong>" + jade.escape(null == (jade_interp = column + ":  ") ? "" : jade_interp) + "</strong>");
        if (Array.isArray(data)) {
            var y;
            (function () {
                var $obj = data;
                if ("number" == typeof $obj.length) {
                    for (var i = 0, $l = $obj.length; i < $l; i++) {
                        var d = $obj[i];
                        buf.push(templatizer["blocks"]["entityInfo"]["kbrowdata"](column, d, entity.group_ref.dataPlus, entity.coref));
                        if (!(i == data.length - 1)) {
                            buf.push(jade.escape(null == (jade_interp = "; ") ? "" : jade_interp));
                        }
                    }
                } else {
                    var $l = 0;
                    for (var i in $obj) {
                        $l++;
                        var d = $obj[i];
                        buf.push(templatizer["blocks"]["entityInfo"]["kbrowdata"](column, d, entity.group_ref.dataPlus, entity.coref));
                        if (!(i == data.length - 1)) {
                            buf.push(jade.escape(null == (jade_interp = "; ") ? "" : jade_interp));
                        }
                    }
                }
            }).call(this);
        } else {
            buf.push(templatizer["blocks"]["entityInfo"]["kbrowdata"](column, data, entity));
        }
        buf.push("</li>");
        return buf.join("");
    };

    // blocks/entityList.jade compiled template
    templatizer["blocks"]["entityList"] = function tmpl_blocks_entityList() {
        return "<div id=\"leftBottom\">   <div id=\"entityListHeader\" class=\"ui purple inverted menu\"><div class=\"title item\"><i class=\"list icon\"> </i>Entities</div><!--div(class='ui icon buttons right menu purple inverted')div(class='ui button popup item' title='Sort' data-action='sort' data-arg='0')\n    i( class='sort icon')\ndiv(class='ui top right pointing dropdown button' id='entityFilter')\n    i( class='filter icon')\n    div(class='menu' )\n        div(class='ui grid celled')\n            div(class='one wide column' id='pickerBox')\n                div(id='colorPicker')\n            div(class='three wide column')\n                table(class='ui table collapsing compact small' id='entityFilterList')\n                div(class='3 ui buttons mini fluid')\n                    div(class='ui positive enable button')\n                        Enable All\n                    div(class='ui toggle button')\n                        Toggle All\n                    div(class='ui negative disable button')\n                        Disable All\ndiv(class='ui top right pointing button')\n    i( class='settings icon')\n    div(class='menu')--><div class=\"icon menu right\"><a data-hook=\"button\" data-action=\"sort\" class=\"item\"><i class=\"sort icon\"></i><div class=\"ui flowing popup\"><div class=\"ui three column divided equal height center aligned grid\"><div class=\"column\">YOLOOL</div></div></div></a><a data-hook=\"button\" data-action=\"filter\" class=\"item\"><i class=\"filter icon\"></i></a><a data-hook=\"button\" data-action=\"settings\" class=\"item\"><i class=\"settings icon\"></i></a></div></div><div id=\"entityListContent\" data-hook=\"entityList\"></div></div>";
    };

    // blocks/entityListItem.jade compiled template
    templatizer["blocks"]["entityListItem"] = function tmpl_blocks_entityListItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            buf.push("<span" + jade.cls(["alabel bg-" + model.group + ""], [true]) + ">" + jade.escape((jade_interp = model.bestText) == null ? "" : jade_interp) + "</span>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/kblistitem.jade compiled template
    templatizer["blocks"]["kblistitem"] = function tmpl_blocks_kblistitem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            buf.push('<div class="card kbitem"><div class="content segment blue"><span class="ui right ribbon label blue">Preferred</span><span class="header">' + jade.escape((jade_interp = model.bestText) == null ? "" : jade_interp) + '</span><span class="meta">' + jade.escape((jade_interp = model.data.type) == null ? "" : jade_interp) + '</span><div class="description">' + jade.escape((jade_interp = model.descPrev()) == null ? "" : jade_interp) + '</div><span class="extra">' + jade.escape((jade_interp = model.data.id) == null ? "" : jade_interp) + "</span></div></div>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/toolItem.jade compiled template
    templatizer["blocks"]["toolItem"] = function tmpl_blocks_toolItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            buf.push('<button data-hook="tool"' + jade.attr("data-id", "" + model.name + "", true, false) + ' class="ui button">' + jade.escape((jade_interp = model.nameNormalized) == null ? "" : jade_interp) + "</button>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/visualInfo.jade compiled template
    templatizer["blocks"]["visualInfo"] = function tmpl_blocks_visualInfo() {
        return '<div id="rightBottom">   <div id="carouselHeader" class="ui green inverted menu "><div class="title item"><i class="photo icon"></i>Visual Entity Information</div><div class="icon menu right"><a title="a" data-hook="prevImage" class="item"><i class="angle left icon"></i></a><div id="imgCounter" class="item"><b data-hook="counter">-/-</b></div><a data-hook="nextImage" class="item"><i class="angle right icon"></i></a></div></div><div id="carouselContent"><div id="carouselImageList"><img data-hook="carouselImg"/></div></div></div>';
    };

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div data-hook="pageSidebar" id="pageSidebar" class="ui sidebar left vertical styled very wide segment"></div><div data-hook="pageSidebar2" id="pageSidebar2" class="ui sidebar right vertical styled wide segment"></div><div id="fixedHeader" class="ui top fixed inverted black main menu"><div id="headerMenu" class="container"><div class="title item"><b>Decipher NERC</b></div><div class="right menu"><a data-content="Preview Mode" data-type="nav" href="/preview" class="popup icon item active"><i class="unhide icon"></i></a><a data-content="Annotation Mode" data-type="nav" href="/annotator" class="popup icon item"><i class="edit icon"></i></a><a data-content="Application Settings" data-type="nav" href="/settings" class="popup icon item"><i class="settings icon"></i></a></div></div></div><div id="panelWrapper" data-hook="page-container" class="ui transition pusher"></div><div id="pageDimmer" class="ui page dimmer"><div class="content"><div class="center"><div class="ui text large loader">Loading...<h2>Welcome! Graphical interface is about to loading!</h2><div class="sub header">Please wait till its complete.</div></div></div></div></div><div data-hook="pageModals"></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/person.jade compiled template
    templatizer["includes"]["person"] = function tmpl_includes_person() {
        return '<li class="person list-group-item container"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span class="btn-group pull-right"> <a data-hook="action-edit" class="btn btn-default">edit </a><a href="#" data-hook="action-delete" class="btn btn-danger">delete</a></span></li>';
    };

    // modals/assetManager.jade compiled template
    templatizer["modals"]["assetManager"] = function tmpl_modals_assetManager() {
        return '<div data-hook="assetModal" class="ui large modal"><i class="close icon"></i><div class="header">Asset Manager</div><div class="content"><div class="ui internally celled grid"><div class="row"><div data-hook="toolbox" class="eight wide column"></div><div class="eight wide column"><div data-hook="assetbox" class="ui labels"></div></div></div><div class="row"><div data-hook="toolboxinfo" class="eight wide column"><p>Version:</p></div><div data-hook="assetboxinfo" class="eight wide column"><p>Version:</p></div></div></div></div><div class="actions"><div class="ui button">Close</div></div></div>';
    };

    // pages/annotator.jade compiled template
    templatizer["pages"]["annotator"] = function tmpl_pages_annotator() {
        return '<div class="ui"><h1>This is annotator.</h1></div>';
    };

    // pages/collectionDemo.jade compiled template
    templatizer["pages"]["collectionDemo"] = function tmpl_pages_collectionDemo() {
        return '<section class="page pageOne"><h2>Collection demo</h2><p>Intelligently rendering collections can be a bit tricky. </p><p><a href="https://github.com/ampersandjs/ampersand-view">ampersand-view\'s</a> <code>renderCollection()</code> method makes it simple.</p><p>The only code required to manage the collection is:</p><pre><code>this.renderCollection(\n   this.collection, \n   PersonView, \n   this.queryByHook(\'people-list\')\n);</code></pre><h3>People container:</h3><ul data-hook="people-list" class="list-group"></ul><p>Try it by clicking the buttons</p><div class="buttons btn-group"><button data-hook="reset" class="btn btn-default">.reset() </button><button data-hook="fetch" class="btn btn-default">.fetch() </button><button data-hook="shuffle" class="btn btn-default">.shuffle() </button><button data-hook="add" class="btn btn-default">.addRandom()</button><a href="/person/add" class="btn btn-default">Add Person</a></div><p>Events are always managed so you don\'t get any leaks.</p></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h2>Welcome to a skeleton for annotator</h2><p>If you "view source" you\'ll see it\'s 100% client rendered.</p><p>Click around the site using the nav bar at the top. </p><p>Things to note:<ul><li>The url changes, no requests are made to the server.</li><li>Refreshing the page will always get you back to the same page</li><li>Page changes are nearly instantaneous</li><li>In development mode, you don\'t need to restart the server to see changes, just edit and refresh.</li><li>In production mode, it will serve minfied, uniquely named files with super agressive cache headers. To test:<ul> <li>in dev_config.json set <code>isDev</code> to <code>false</code>.</li><li>restart the server.</li><li>view source and you\'ll see minified css and js files with unique names.</li><li>open the "network" tab in chrome dev tools (or something similar). You\'ll also want to make sure you haven\'t disabled your cache.</li><li>without hitting "refresh" load the app again (selecting current URL in url bar and hitting "enter" works great).</li><li>you should now see that the JS and CSS files were both served from cache without making any request to the server at all.</li></ul></li></ul></p></section>';
    };

    // pages/info.jade compiled template
    templatizer["pages"]["info"] = function tmpl_pages_info() {
        return '<section class="page pageTwo"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p></section>';
    };

    // pages/personAdd.jade compiled template
    templatizer["pages"]["personAdd"] = function tmpl_pages_personAdd() {
        return '<section class="page add-person"><h2>Add Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/personEdit.jade compiled template
    templatizer["pages"]["personEdit"] = function tmpl_pages_personEdit() {
        return '<section class="page edit-person"><h2>Edit Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/personView.jade compiled template
    templatizer["pages"]["personView"] = function tmpl_pages_personView() {
        return '<section class="page view-person"><h2 data-hook="name"></h2><img data-hook="avatar" width="80" height="80"/><div class="buttons"><a data-hook="edit" class="btn">Edit</a><button data-hook="delete" class="btn">Delete</button></div></section>';
    };

    // pages/preview.jade compiled template
    templatizer["pages"]["preview"] = function tmpl_pages_preview() {
        return '<div class="ui celled grid"><div data-hook="leftColumn" class="ten wide middle column"><div data-hook="menu"></div><div data-hook="editor"></div><div data-hook="entityList"></div></div><div data-hook="rightColumn" class="six wide right column"><div data-hook="entityInfo"></div><div data-hook="visualInfo"></div></div></div>';
    };

    // pages/settings.jade compiled template
    templatizer["pages"]["settings"] = function tmpl_pages_settings() {
        return "<h1>This is settings</h1>";
    };

    // sidebars/assets.bkp compiled template
    templatizer["sidebars"]["assets"] = function tmpl_sidebars_assets(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (asset, model, tool, undefined) {
            buf.push('<div><h3 class="ui header center aligned"><i class="icon archive"></i>Assets &amp; Tools Manager</h3><div class="ui divider"></div><div class="ui form"><div class="field"><label>Available Tools:</label><div id="toolList" class="ui selection dropdown fluid"><input name="tool" type="hidden" value="ner"/><div class="default text">Please select your favorite tool</div><i class="dropdown icon"></i><div id="toolListInternal" class="menu ui transition hidden">');
            n = 0;
            while (n < model.tools.length) {
                tool = model.tools.at(n++);
                buf.push("<div" + jade.attr("data-value", "" + tool.name + "", true, false) + ' class="item">' + jade.escape((jade_interp = tool.nameNormalized) == null ? "" : jade_interp) + "</div>");
            }
            buf.push('</div></div></div><div id="toolError" class="ui red pointing above ui label fluid hidden">Please select a tool!</div><div>Tool version:<div id="tool_version">');
            if (model.tool_selected != null) {
                buf.push("" + jade.escape((jade_interp = model.tool_selected.version) == null ? "" : jade_interp) + "");
            }
            buf.push('</div></div><div class="ui divider"></div><div class="ui form"><div class="field"><label>Tool Parameters:</label><div id="toolParams">');
            var n = 0;
            if (model.tool_selected != null) {
                (function () {
                    var $obj = model.tool_selected.params;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var param = $obj[$index];
                            buf.push('<div class="ui checkbox"><input type="checkbox" name="params"' + jade.attr("value", "" + param + "", true, false) + "/><label>" + jade.escape((jade_interp = param) == null ? "" : jade_interp) + "</label></div>");
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var param = $obj[$index];
                            buf.push('<div class="ui checkbox"><input type="checkbox" name="params"' + jade.attr("value", "" + param + "", true, false) + "/><label>" + jade.escape((jade_interp = param) == null ? "" : jade_interp) + "</label></div>");
                        }
                    }
                }).call(this);
            }
            buf.push('</div></div></div><div class="ui divider"></div><div class="field"><label>Assets Controll:</label><table class="ui table definition small compact center aligned"><thead><tr><th class="collapsing">&nbsp;</th><th>Name</th><th>Type</th><th>Tool</th><th class="collapsing"><abbr title="Status"><i class="icon off"></i></abbr></th><th class="collapsing"><abbr title="Control"><i class="icon cloud"></i></abbr></th></tr></thead><tbody id="assetTable">');
            n = 0;
            while (n < model.assets.length) {
                asset = model.assets.at(n++);
                buf.push("<tr><td>");
                if (asset.selected) {
                    buf.push('<input name="assets" type="radio"' + jade.attr("value", "" + asset.id + "", true, false) + ' checked="checked"/>');
                } else {
                    buf.push('<input name="assets" type="radio"' + jade.attr("value", "" + asset.id + "", true, false) + "/>");
                }
                buf.push("</td><td>" + jade.escape((jade_interp = asset.name) == null ? "" : jade_interp) + "</td><td>" + jade.escape((jade_interp = asset.type) == null ? "" : jade_interp) + "</td><td>" + jade.escape((jade_interp = asset.tools) == null ? "" : jade_interp) + "</td><td><i" + jade.cls(["" + asset.statusIcon + " icon"], [true]) + "></i></td><td><i" + jade.attr("data-value", "" + asset.id + "", true, false) + jade.cls(["" + asset.controlIcon + " icon"], [true]) + "></i></td></tr>");
            }
            buf.push('</tbody><tfoot class="ui transition hidden"><tr><th colspan="6"><div><ul><li>Name:</li><li>Description</li><li>Type:</li><li>Tools:</li><li>Status:</li><li>Control:</li><li>Parts:</li></ul></div></th></tr></tfoot></table><div id="assetError" class="ui red pointing above ui label fluid hidden">Please select an asset!</div><div>Asset Version:<span id="asset_version"></span>');
            if (model.asset_selected != null) {
                buf.push("" + jade.escape((jade_interp = model.asset_selected.version) == null ? "" : jade_interp) + "");
            }
            buf.push('</div></div><div data-hook="hide" class="ui green fluid button"><i class="left icon"></i>Hide</div></div></div>');
        }).call(this, "asset" in locals_for_with ? locals_for_with.asset : typeof asset !== "undefined" ? asset : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "tool" in locals_for_with ? locals_for_with.tool : typeof tool !== "undefined" ? tool : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // sidebars/assets_pokus.jade compiled template
    templatizer["sidebars"]["assets_pokus"] = function tmpl_sidebars_assets_pokus(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (asset, model, n) {
            buf.push('<div><h3 class="ui header center aligned"><i class="icon archive"></i>Assets &amp; Tools Manager</h3><div class="ui divider"></div><div class="ui form"><div class="field"><label>Available Tools:</label><div class="ui list horizontal"><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div><div class="ui item"><div class="ui content"><div class="ui button inverted blue fluid">NER</div></div></div></div></div><div id="toolError" class="ui red pointing above ui label fluid">Please select a tool!</div><div class="ui divider"></div><div class="ui form"><div class="field"><label>Tool Parameters:</label><div id="toolParams">');
            n = 0;
            buf.push('</div></div></div><div class="ui divider"></div><div class="field"><label>Assets Controll:</label><table class="ui table definition small compact center aligned"><thead><tr><th class="collapsing">&nbsp;</th><th>Name</th><th>Type</th><th>Tool</th><th class="collapsing"><abbr title="Status"><i class="icon off"></i></abbr></th><th class="collapsing"><abbr title="Control"><i class="icon cloud"></i></abbr></th></tr></thead><tbody id="assetTable">');
            n = 0;
            while (n < model.assets.length) {
                asset = model.assets.at(n++);
                buf.push("<tr><td>");
                if (asset.selected) {
                    buf.push('<input name="assets" type="radio"' + jade.attr("value", "" + asset.name + "", true, false) + ' checked="checked"/>');
                } else {
                    buf.push('<input name="assets" type="radio"' + jade.attr("value", "" + asset.name + "", true, false) + "/>");
                }
                buf.push("</td><td>" + jade.escape((jade_interp = asset.name) == null ? "" : jade_interp) + "</td><td>" + jade.escape((jade_interp = asset.type) == null ? "" : jade_interp) + "</td><td>" + jade.escape((jade_interp = asset.tools) == null ? "" : jade_interp) + "</td><td><i" + jade.cls(["" + asset.statusIcon + " icon"], [true]) + "></i></td><td><i" + jade.cls(["" + asset.controlIcon + " icon"], [true]) + "></i></td></tr>");
            }
            buf.push('</tbody><tfoot class="ui transition hidden"><tr><th colspan="6"><div><ul><li>Name:</li><li>Description</li><li>Type:</li><li>Tools:</li><li>Status:</li><li>Control:</li><li>Parts:</li></ul></div></th></tr></tfoot></table><div id="assetError" class="ui red pointing above ui label fluid">Please select an asset!</div></div><div data-hook="hide" class="ui green fluid button"><i class="left icon"></i>Hide</div></div></div>');
        }).call(this, "asset" in locals_for_with ? locals_for_with.asset : typeof asset !== "undefined" ? asset : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "n" in locals_for_with ? locals_for_with.n : typeof n !== "undefined" ? n : undefined);
        return buf.join("");
    };

    // sidebars/kblist.jade compiled template
    templatizer["sidebars"]["kblist"] = function tmpl_sidebars_kblist() {
        return '<div data-hook="kbprev" class="ui divided cards"></div>';
    };

    // widgets/dropdown.jade compiled template
    templatizer["widgets"]["dropdown"] = function tmpl_widgets_dropdown() {
        return '<div data-hook="dropBase" class="ui dropdown"><i class="cloud download icon"></i><div class="text">Remote File</div><i class="icon dropdown"></i><div data-hook="dropItems" class="menu"></div></div>';
    };

    // widgets/dropdownrow.jade compiled template
    templatizer["widgets"]["dropdownrow"] = function tmpl_widgets_dropdownrow(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function (model) {
            buf.push('<a data-hook="button" data-action="getExampleFile"' + jade.attr("data-arg", "" + model.name + "", true, false) + ' class="item">' + jade.escape((jade_interp = model.name) == null ? "" : jade_interp) + "</a>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    return templatizer;
}));
