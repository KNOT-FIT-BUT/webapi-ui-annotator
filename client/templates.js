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
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function t(e,r){if(1===arguments.length){for(var a=e[0],i=1;i<e.length;i++)a=t(a,e[i]);return a}var o=e.class,s=r.class;(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),e.class=o.concat(s).filter(n));for(var f in r)"class"!=f&&(e[f]=r[f]);return e},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(JSON.stringify(t).indexOf("&")!==-1&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function n(t,e,r,a){if(!(t instanceof Error))throw t;if(!("undefined"==typeof window&&e||a))throw t.message+=" on line "+r,t;try{a=a||require("fs").readFileSync(e,"utf8")}catch(e){n(t,null,r)}var i=3,o=a.split("\n"),s=Math.max(r-i,0),f=Math.min(o.length,r+i),i=o.slice(s,f).map(function(n,t){var e=t+s+1;return(e==r?"  > ":"    ")+e+"| "+n}).join("\n");throw t.path=e,t.message=(e||"Jade")+":"+r+"\n"+i+"\n\n"+t.message,t},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["blocks"] = {};
    templatizer["modals"] = {};
    templatizer["pages"] = {};
    templatizer["sidebars"] = {};
    templatizer["widgets"] = {};

    // blocks/EditorItem.jade compiled template
    templatizer["blocks"]["EditorItem"] = function tmpl_blocks_EditorItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
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
        (function(model) {
            buf.push('<a data-hook="asset"' + jade.attr("data-id", "" + model.id + "", true, false) + ' class="ui label"><i data-hook="pref_icon"></i><span class="name">' + jade.escape((jade_interp = model.name) == null ? "" : jade_interp) + '</span><i data-hook="suff_icon"></i></a>');
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/assetState.jade compiled template
    templatizer["blocks"]["assetState"] = function tmpl_blocks_assetState() {
        return '<div class="ui two columns grid"><div class="column"><strong>State:</strong><span data-hook="assetState" class="ui label"></span></div><div class="column"><div data-hook="assetControlBtn" class="ui mini button">ControlButton</div></div></div>';
    };

    // blocks/editor.jade compiled template
    templatizer["blocks"]["editor"] = function tmpl_blocks_editor() {
        return '<div id="editorBlock" class="ui dimmable "><div class="ui dimmer"><div id="editorBlockDimmerText" class="ui text loader">Processing...</div></div><pre id="editorItem" contentEditable="true" spellcheck="false" lang="en" data-hook="editor"></pre></div>';
    };

    // blocks/editorMenu.jade compiled template
    templatizer["blocks"]["editorMenu"] = function tmpl_blocks_editorMenu() {
        return '<div id="previewMenu"><div id="editorHeader"><div class="ui top attached menu"><a data-tab="annotate" class="active item"><i class="lab icon"></i>Annotate</a><a data-tab="save" class="item"><i class="save icon"></i>Save</a><a data-tab="manage" class="item"><i class="content basic icon"></i>Manage</a><div class="right menu"><div class="item">Cursor position:<div data-hook="cursorPos">0</div></div></div></div><div data-tab="annotate" class="ui active tab"><div class="ui small secondary menu"><a data-hook="button" data-action="annotate" class="item">Annotate</a><a data-hook="button" data-action="annotateSelection" class="item">Annotate Selected</a><a data-hook="button" data-action="loadLocalFile" class="item"><i class="icon disk outline"></i>Local File</a><div data-hook="dropBase" class="ui dropdown link item"><i class="cloud download icon"></i><div class="text">Example Files</div><i class="icon dropdown"></i><div data-hook="dropItems" class="menu"></div></div></div></div><div data-tab="save" class="ui tab"><div class="ui small secondary menu"><a data-hook="button" data-action="saveJSON" data-arg="json" class="item">JSON</a><a data-hook="button" data-action="saveXML" data-arg="xml" class="item">XML</a><a data-hook="button" data-action="saveYAMLt" data-arg="yaml" class="item">YAML</a></div></div><div data-tab="manage" class="ui tab"><div class="ui small secondary menu"><a data-hook="button" data-action="manageEntities" class="item">Entities</a><a data-hook="button" data-action="showAssetManager" class="item">Assets &amp; Tools</a><a data-hook="button" data-action="manageImages" class="item">Images</a></div></div></div></div>';
    };

    // blocks/entityFilter.jade compiled template
    templatizer["blocks"]["entityFilter"] = function tmpl_blocks_entityFilter() {
        return '<div id="entityFilterPopup" style="top: 554px; left: 1px; bottom: auto; right: auto; width: 460px;" class="ui flowing popup transition hidden"><div class="ui center aligned"><div class="ui labeled segment"><div class="ui top left attached label">Filters</div><div data-hook="groupFilters" class="ui labels"></div><div class="ui bottom right attached label"><div class="ui small basic icon buttons"><button data-action="check_all" class="ui button"><i class="checkmark box icon"></i></button><button data-action="toggle" class="ui button"><i class="refresh icon"></i></button><button data-action="uncheck_all" class="ui button"><i class="square outline icon"></i></button></div></div></div><div class="ui labeled segment"><div class="ui top left attached label">Scope</div><div id="filterScope"><button data-scope="editor" class="ui toggle button scope active">Editor</button><button data-scope="entities" class="ui toggle button scope active">Entites</button></div></div></div></div>';
    };

    // blocks/entityFilterItem.jade compiled template
    templatizer["blocks"]["entityFilterItem"] = function tmpl_blocks_entityFilterItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push('<div class="inline field"><div' + jade.attr("id", "chckbox-" + model.prefix + "", true, false) + ' class="ui checkbox filter"><input type="checkbox" class="hidden"/><label><strong class="item">' + jade.escape((jade_interp = model.name) == null ? "" : jade_interp) + "</strong></label></div></div>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/entityInfo.jade compiled template
    templatizer["blocks"]["entityInfo"] = function tmpl_blocks_entityInfo(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(Array, model, preview, undefined) {
            buf.push('<div id="rightTop"><div id="entityInfoHeader" class="ui inverted teal menu"><div class="title item"><i class="info icon"> </i>Textual Entity Information</div><div class="icon menu right">');
            var disabled = model.entitySelected && model.entitySelected.others && model.entitySelected.others.length > 1 ? "" : "disabled";
            buf.push('<a data-hook="showBar"' + jade.cls([ "item " + disabled + "" ], [ true ]) + '><i class="list layout icon"></i></a></div></div><div id="entityInfoContent">');
            if (model.entitySelected != null && model.entitySelected.preferred != null) {
                var kbid = preview || model.entitySelected.preferred;
                var kb = model.entitySelected.kb_ref[kbid];
                buf.push("<ul>");
                (function() {
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
            (function() {
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
        return '<div id="leftBottom"><div id="entityListHeader" class="ui blue inverted menu"><div class="title item"><i class="list icon"></i>Entities</div><div class="icon menu right"><a data-hook="button" data-action="sort" class="item"><i data-hook="sortIcon" class="icon"></i></a><a data-hook="button" data-action="filter" class="item"><i class="filter icon"></i></a><a data-hook="button" data-action="settings" class="item"><i class="settings icon"></i></a></div></div><div id="entityListContent" data-hook="entityList"></div></div>';
    };

    // blocks/entityListItem.jade compiled template
    templatizer["blocks"]["entityListItem"] = function tmpl_blocks_entityListItem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push("<span" + jade.cls([ "alabel bg-" + model.group + "" ], [ true ]) + ">" + jade.escape((jade_interp = model.bestText) == null ? "" : jade_interp) + "</span>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/kblistitem.jade compiled template
    templatizer["blocks"]["kblistitem"] = function tmpl_blocks_kblistitem(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
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
        (function(model) {
            buf.push('<button data-hook="tool"' + jade.attr("data-id", "" + model.name + "", true, false) + ' class="ui button">' + jade.escape((jade_interp = model.nameNormalized) == null ? "" : jade_interp) + "</button>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // blocks/toolSwitches.jade compiled template
    templatizer["blocks"]["toolSwitches"] = function tmpl_blocks_toolSwitches(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model, undefined) {
            buf.push('<div class="ui form"><div class="inline fields">');
            if (model.tool_selected != null) {
                (function() {
                    var $obj = model.tool_selected.switches;
                    if ("number" == typeof $obj.length) {
                        for (var chname = 0, $l = $obj.length; chname < $l; chname++) {
                            var chstate = $obj[chname];
                            buf.push('<div class="field"><div class="ui checkbox"><input type="checkbox"' + jade.attr("name", chname, true, false) + jade.attr("checked", chstate, true, false) + "/><label>" + jade.escape(null == (jade_interp = chname) ? "" : jade_interp) + "</label></div></div>");
                        }
                    } else {
                        var $l = 0;
                        for (var chname in $obj) {
                            $l++;
                            var chstate = $obj[chname];
                            buf.push('<div class="field"><div class="ui checkbox"><input type="checkbox"' + jade.attr("name", chname, true, false) + jade.attr("checked", chstate, true, false) + "/><label>" + jade.escape(null == (jade_interp = chname) ? "" : jade_interp) + "</label></div></div>");
                        }
                    }
                }).call(this);
            }
            buf.push("</div></div>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // blocks/visualInfo.jade compiled template
    templatizer["blocks"]["visualInfo"] = function tmpl_blocks_visualInfo() {
        return '<div id="rightBottom">   <div id="carouselHeader" class="ui green inverted menu "><div class="title item"><i class="photo icon"></i>Visual Entity Information</div><div class="icon menu right"><a title="a" data-hook="prevImage" class="item"><i class="angle left icon"></i></a><div id="imgCounter" class="item"><b data-hook="counter">-/-</b></div><a data-hook="nextImage" class="item"><i class="angle right icon"></i></a></div></div><div id="carouselContent"><div id="carouselImageList" data-hook="carousel"><img data-hook="carouselImg"/></div><div class="notFound hidden"><div class="ui center aligned icon header"><i class="grey huge icons"><!--i.big.dont.icon--><i class="file image outline icon"></i></i><div class="content">404 - Not Found</div></div></div></div></div>';
    };

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div data-hook="pageSidebar" id="pageSidebar" class="ui left very wide sidebar"></div><div data-hook="pageSidebar2" id="pageSidebar2" class="ui right wide sidebar"></div><div id="fixedHeader" class="ui top fixed inverted black main menu"><div id="headerMenu" class="container"><div class="title item"><b>Decipher NERC</b></div><div class="right menu"><a data-content="Preview Mode" data-type="nav" href="/preview" class="popup icon item active"><i class="unhide icon"></i></a><a data-content="Annotation Mode" data-type="nav" href="/annotator" class="popup icon item"><i class="edit icon"></i></a><a data-content="Application Settings" data-type="nav" href="/settings" class="popup icon item"><i class="settings icon"></i></a></div></div></div><div id="panelWrapper" data-hook="page-container" class="ui transition pusher"></div><div id="pageDimmer" class="ui page dimmer"><div class="content"><div class="center"><div class="ui text large loader">Loading...<h2>Welcome! Graphical interface is about to loading!</h2><div class="sub header">Please wait till its complete.</div></div></div></div></div><div data-hook="pageModals"></div><div data-hook="pagePopups"></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // modals/assetManager.jade compiled template
    templatizer["modals"]["assetManager"] = function tmpl_modals_assetManager() {
        return '<div data-hook="assetModal" class="ui large modal"><i class="close icon"></i><div class="header">Asset Manager</div><div class="content"><div class="ui internally celled grid"><div class="row"><div data-hook="toolbox" class="eight wide column"></div><div class="eight wide column"><div data-hook="assetbox" class="ui labels"></div></div></div><div class="row"><div class="eight wide column"><div data-hook="switches"></div><p>Version:<span data-hook="toolboxinfo"></span></p></div><div class="eight wide column"><div data-hook="states"></div><p>Version:<span data-hook="assetboxinfo"></span></p></div></div></div></div><div class="actions"><div id="closeButton" class="ui button">Close</div></div></div>';
    };

    // pages/annotator.jade compiled template
    templatizer["pages"]["annotator"] = function tmpl_pages_annotator() {
        return '<div class="ui"><h1>This is annotator.</h1></div>';
    };

    // pages/preview.jade compiled template
    templatizer["pages"]["preview"] = function tmpl_pages_preview() {
        return '<div class="ui celled grid"><div data-hook="leftColumn" class="ten wide middle column"><div data-hook="menu"></div><div data-hook="editor"></div><div data-hook="entityList"></div></div><div data-hook="rightColumn" class="six wide right column"><div data-hook="entityInfo"></div><div data-hook="visualInfo"></div></div><div data-hook="previewPopups"></div></div>';
    };

    // pages/settings.jade compiled template
    templatizer["pages"]["settings"] = function tmpl_pages_settings() {
        return "<h1>This is settings</h1>";
    };

    // sidebars/assets.jade compiled template
    templatizer["sidebars"]["assets"] = function tmpl_sidebars_assets(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(asset, model, param, tool) {
            buf.push("<!--possibly deprecated--><!--div(class=\"ui segment\")h3(class='ui header center aligned')\n    i(class='icon archive')\n    |Assets &amp; Tools Manager\ndiv(class='ui divider')\ndiv(class='ui form')\n    div(class='field')\n      label Available Tools:\n      div(class='ui selection dropdown fluid' id='toolList')\n            input(name='tool' type='hidden' value='ner')\n            div(class='default text') Please select your favorite tool\n            i(class='dropdown icon')\n            div(id='toolListInternal' class='menu ui transition hidden')\n                - n = 0\n                while n < model.tools.length\n                    - tool = model.tools.at(n++)\n                    div(class='item' data-value='" + jade.escape((jade_interp = tool.name) == null ? "" : jade_interp) + "') " + jade.escape((jade_interp = tool.nameNormalized) == null ? "" : jade_interp) + "\n\n    div(id='toolError' class='ui red pointing above ui label fluid hidden') Please select a tool!\n    div\n        | Tool version:\n        div(id=\"tool_version\")\n            if model.tool_selected != null\n                | " + jade.escape((jade_interp = model.tool_selected.version) == null ? "" : jade_interp) + "\n    div(class='ui divider')\n    div(class='ui form')\n        div(class='field')\n            label Tool Parameters:\n            div(id='toolParams')\n                - var n = 0;\n                if model.tool_selected != null\n                    each param in model.tool_selected.params\n                        div.ui.checkbox\n                            input(type=\"checkbox\" name=\"params\" value=\"" + jade.escape((jade_interp = param) == null ? "" : jade_interp) + '")\n                            label ' + jade.escape((jade_interp = param) == null ? "" : jade_interp) + "\n\n    div(class='ui divider')\n    div(class='field')\n        label Assets Controll:\n        table(class='ui table definition small compact center aligned')\n            thead\n                tr\n                    th(class=\"collapsing\") &nbsp;\n                    th Name\n                    th Type\n                    th Tool\n                    th(class=\"collapsing\")\n                        abbr(title='Status')\n                            i(class='icon off')\n                    th(class=\"collapsing\")\n                        abbr(title='Control')\n                            i(class='icon cloud')\n\n            tbody(id='assetTable')\n                - n = 0\n                while n < model.assets.length\n                    - asset = model.assets.at(n++)\n                    tr\n                        td\n                            if asset.selected\n                                input(name='assets' type='radio' value='" + jade.escape((jade_interp = asset.id) == null ? "" : jade_interp) + "' checked='checked')\n                            else\n                                input(name='assets' type='radio' value='" + jade.escape((jade_interp = asset.id) == null ? "" : jade_interp) + "')\n                        td " + jade.escape((jade_interp = asset.name) == null ? "" : jade_interp) + "\n                        td " + jade.escape((jade_interp = asset.type) == null ? "" : jade_interp) + "\n                        td " + jade.escape((jade_interp = asset.tools) == null ? "" : jade_interp) + "\n                        td\n                            i(class='" + jade.escape((jade_interp = asset.statusIcon) == null ? "" : jade_interp) + " icon')\n                        td\n                            i(class='" + jade.escape((jade_interp = asset.controlIcon) == null ? "" : jade_interp) + " icon' data-value=\"" + jade.escape((jade_interp = asset.id) == null ? "" : jade_interp) + "\")\n            tfoot(class='ui transition hidden')\n                tr\n                    th(colspan='6' class='')\n                        div\n                            ul\n                                li Name:\n                                li Description\n                                li Type:\n                                li Tools:\n                                li Status:\n                                li Control:\n                                li Parts:\n\n        div(id='assetError' class='ui red pointing above ui label fluid hidden') Please select an asset!\n        div\n            | Asset Version:\n            span(id=\"asset_version\")\n            if model.asset_selected != null\n                | " + jade.escape((jade_interp = model.asset_selected.version) == null ? "" : jade_interp) + "\n    div(class='ui green fluid button' data-hook='hide')\n        i(class='left icon')\n        |Hide-->");
        }).call(this, "asset" in locals_for_with ? locals_for_with.asset : typeof asset !== "undefined" ? asset : undefined, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined, "param" in locals_for_with ? locals_for_with.param : typeof param !== "undefined" ? param : undefined, "tool" in locals_for_with ? locals_for_with.tool : typeof tool !== "undefined" ? tool : undefined);
        return buf.join("");
    };

    // sidebars/kblist.jade compiled template
    templatizer["sidebars"]["kblist"] = function tmpl_sidebars_kblist() {
        return '<div data-hook="kbprev" class="ui centered cards"></div>';
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
        (function(model) {
            buf.push('<a data-hook="button" data-action="getExampleFile"' + jade.attr("data-arg", "" + model.name + "", true, false) + ' class="item">' + jade.escape((jade_interp = model.name) == null ? "" : jade_interp) + "</a>");
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    return templatizer;
}));
