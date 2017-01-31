var Collection = require('./base/collection');
var Asset = require('./m_asset');


module.exports = Collection.extend({
    model: Asset,
    mainIndex: "id",
    indexes: ['name'],
    modelType: 'assets',


    fromJSON: function (data, selectedTool) {
        //this.reset();
        var cnt = 1;
        var newset = [];
        var select = this.length == 0;
        for (var i in data) {
            var item = data[i];
            item.id = i;
            /*
             if(select == true && (item.tools.indexOf(selectedTool.name) > -1) && item.name == "KBstatsMetrics"){
             item.selected = true;
             select = false;
             }*/
            newset.push(item);
        }
        this.set(newset);

    },


    selectFirstLoaded:function(preffered){
        var pref = this.get(preffered);
        console.log("prefered ",pref);
        if(pref != undefined && pref.state == 4){
            return pref;
        };
        for(var i in this){
            var item = this[i];
            if(item.state == 4){
                return item;
            }
        };
        return null;
    },

});