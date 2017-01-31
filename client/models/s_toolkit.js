var Asset = require('./m_asset');
var Assets = require('./c_assets');
var Tool = require('./m_tool');
var Tools = require('./c_tools');
var AmpersandState = require('./base/state');
var FilteredCollection = require('ampersand-filtered-subcollection');

module.exports = AmpersandState.extend({

    modelType: 'toolkit',

    props: {
        updated: ["int", false, 0],
        tool_selected: ['object', false, null],
        asset_selected: ['object', false, null],
    },

    collections: {
        tools: Tools,
        assets: Assets,
    },

    derived: {
        filtered_assets: {
            deps: ['assets', 'tool_selected'],
            fn: function () {
                var self = this;
                return new FilteredCollection(this.assets, {
                    filter: function (model) {

                        if (self.tool_selected != null) {
                            console.log("filtering!", model.tools, self.tool_selected.name, model.tools.indexOf(self.tool_selected.name));
                            if (model.tools.indexOf(self.tool_selected.name) > -1) {
                                console.log("found!");
                                return true;
                            }
                        } else {
                            console.log("filtering!", model.tools, self.tool_selected);
                        }
                        return false;
                    }
                })
            }
        }
    },

    initialize: function () {
        var self = this;
        this.tools.on("add change", function (a, b) {
            console.log("tools_changed");
            self.trigger("toa_refresh");
        });
        this.assets.on("add change", function (a, b) {
            console.log("asset_changed");
            self.trigger("toa_refresh");
        });


    },


    getSelectedTool: function () {
        return (this.tool_selected == null) ? null : this.tool_selected;
    },

    getSelectedAsset: function () {

        return (this.asset_selected == null) ? null : this.asset_selected;
    },

    fromJSON: function (data) {
        var first = this.tools.length == 0 || this.assets.length == 0;
        this.tools.fromJSON(data['tools']);
        this.assets.fromJSON(data['assets']);
        if (first) {
            this.tool_selected = this.tools.get("ner");
            this.tool_selected.selected = true;
            this.asset_selected = this.assets.get("KBstatsMetrics");
            this.asset_selected.selected = true;
            //app.trigger("toa_refresh");
            console.log("fist update");
            app.trigger("selected_tool_changed");
            //this.listenTo(this.asset_selected,"change:isLoading",function(){console.log("selected asset changed!")});
        }
    },


    toolSelected: function (tool) {
        this.tool_selected.selected = false;
        this.tool_selected = this.tools.get(tool);
        this.tool_selected.selected = true;
        console.log("toolSelected resutl", this.tool_selected, tool, this.tools.get(tool));
        this.checkToolAssetCombination();
        app.trigger("selected_tool_changed");
    },

    assetSelected: function (asset) {
        console.log("asset change pokus", asset);
        this.asset_selected.selected = false;
        this.asset_selected = this.assets.get(asset);
        this.asset_selected.selected = true;
        console.log(this.asset_selected);
        app.trigger("selected_asset_changed");
    },

    checkToolAssetCombination: function () {
        if(this.asset_selected != null){
            this.asset_selected.selected = false;
        }
        var asset = this.filtered_assets.get(this.asset_selected.name)
        console.log("yolo", asset);
        if(asset == undefined){
            this.asset_selected = this.assets.selectFirstLoaded("KBstatsMetrics");
            if(this.asset_selected != null){
                this.asset_selected.selected = true;
            }
        }else{
            this.asset_selected = asset;
             this.asset_selected.selected = true;
        }
    },

    getParams: function () {
        if(this.tool_selected){
            return this.tool_selected.switches;
        }
    }


});
