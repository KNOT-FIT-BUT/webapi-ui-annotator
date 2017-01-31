var app = require('ampersand-app');
var _ = require('underscore');
var ajax = require('./ajax');
var ws = require('./websockets');

//var ebus = require('../eventbus');
var State = require("ampersand-state");


function Interface() {


}
/*
 extend(Interface.prototype, ebus, {

 initialize:function(){
 console.log("net iface init!");
 }
 });
 */


module.exports = State.extend({
    initialize: function () {
        this.io = this.getInterface();
        this.listenTo(app, 'all', this.onMessage);

    },

    getInterface: function () {
        return new ajax(this);
    },

    onMessage: function (command, payload) {
        console.log("Interface", command, payload);
        switch (command) {
            case "annotate":
                var asset = app.toolkit.getSelectedAsset();
                var tool = app.toolkit.getSelectedTool();
                var params = app.toolkit.getParams();
                this.io.send("annotate", {
                    assetName: asset.id,
                    text: app.workset.sourceText,
                    tool: tool.name,
                    toolParams: params
                });
                break;
            case "annotateSelection":
                if (app.workset.sourceTextSelection != null) {
                    var asset = app.toolkit.getSelectedAsset();
                    var tool = app.toolkit.getSelectedTool();
                    var text = app.workset.sourceText.substring(app.workset.sourceTextSelection.startOffset, app.workset.sourceTextSelection.endOffset);
                    console.log(text);
                    this.io.send("annotate", {
                        assetName: asset.id,
                        text: text,
                        tool: tool.name,
                        toolParams: {"lower": false, "remove accent": false}
                    }, {offset: app.workset.sourceTextSelection.startOffset});
                }

                break;
            case "getInitPack":
                this.io.send("getWebapiInitPack", null);
                break;
            case "getExampleFile":
                this.io.send("getFile", {filename: payload.arg});
                break;
            case "load_asset":
                this.io.send("loadAsset", {assetName: payload.arg});
                break;
            case "drop_asset":
                break;
            default:
                break;
        }
    },

    onNetworkEvent: function (command, payload, mods) {
        //console.log("Network Recieve",command, payload);
        switch (command) {
            case "annotate":
                app.workset.fromJSON(payload, mods)
                break;
            case "getWebapiInitPack":
                app.filesss.fromJSON(payload["example_files"]);
                //window.assets.fromJSON(payload['assets']);
                //window.tools.fromJSON(payload['tools']);
                app.toolkit.fromJSON(payload);
                //console.log("#01", window.assets, window.tools);
                break;
            case "getFile":
                app.workset.updateTextModel(payload, false);
                break;
            default:
                break;

        }
    }
});