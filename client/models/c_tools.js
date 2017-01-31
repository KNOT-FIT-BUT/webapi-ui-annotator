var Collection = require('./base/collection');
var Tool = require('./m_tool');


module.exports = Collection.extend({
    model: Tool,
    mainIndex: "name",


    fromJSON: function (data) {
        //this.reset();
        var cnt = 1;
        var newset = [];
        var select = this.length == 0;
        for (var i in data) {
            var item = data[i];
            item.id = cnt++;
            /*if(select){
             item.selected = true;
             select = false;
             }*/
            //item.init_switches();
            newset.push(item);
        }
        this.set(newset);

    },

    filterByTool: function (toolname) {
        //TODO:
    }


});