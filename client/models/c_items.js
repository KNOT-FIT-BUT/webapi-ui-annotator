var Collection = require('./base/collection');
var Item = require('./m_item');


module.exports = Collection.extend({
    model: Item,
    mainIndex: 'id',
    indexes: ['type'],


    fromJSON: function (items) {
        //this.reset();
        for (var i in items) {
            var ntext = (items[i].length == 5) ? items[i][5] : ""
            this.add({
                id: parseInt(i),
                entity: parseInt(items[i][0]),
                tags: items[i][1],
                start: parseInt(items[i][2]),
                stop: parseInt(items[i][3]),
                text: items[i][4],
                text_normalized: ntext,
                type: "item"
            });
        }

    },


    tokenize: function (item_list, text, entities, offset) {
        this.reset();
        if (item_list == null || item_list == undefined || item_list.length == 0) {
            this.addItem(1, -1, [], 0, text.length, text, text, "text", null);
            return;
        }

        var t_start = 0;
        var t_stop;
        var text_id = item_list.length + 5;
        for (var i in item_list) {

            var entity = item_list[i][0];
            var tags = item_list[i][1];

            var i_start = item_list[i][2];
            var i_stop = item_list[i][3];
            var i_data = item_list[i][4];
            var ntext = (item_list[i].length == 5) ? item_list[i][5] : "";

            t_stop = i_start + offset;
            //output +="<span data-start='"+t_start+"'>"+text.substring(t_start, t_stop)+"</span>";
            this.addItem(++text_id, -1, [], t_start, t_stop, text.substring(t_start, t_stop), ntext, "text", entities);

            //output +="<strong data-entity='"+groupID+"' data-tags='"+tags.join(" ")+"' class='"+entity[groupID].group+"'>"+text.substring(i_start, i_stop)+"</strong>";
            //this.add({id:parseInt(i), entity: parseInt(items[i][0]),tags: items[i][1], start: parseInt(items[i][2]),stop: parseInt(items[i][3]),text: items[i][4], text_normalized:ntext, type:"item"});
            this.addItem(i, entity, tags, i_start + offset, i_stop + offset, text.substring(i_start + offset, i_stop + offset), ntext, "item", entities);
            t_start = i_stop + offset;
        }
        //output +="<span data-start='"+t_start+"'>"+text.substring(t_start)+"</span>";
        this.addItem(++text_id, -1, tags, t_start, text.length, text.substring(t_start), ntext, "text", entities);
    },

    addItem: function (id, entity, tags, start, stop, text, ntext, type, entities) {
        if (start == stop) return;
        //console.log(id, entity, tags, start, stop, text, ntext,type);
        var item = new Item({
            id: parseInt(id),
            entityID: parseInt(entity),
            tags: tags,
            start: parseInt(start),
            stop: parseInt(stop),
            text: text,
            text_normalized: ntext,
            type: type
        });
        item.link_entity(entities);
        //this.add({id:parseInt(id), entityID: parseInt(entity),tags: tags, start: parseInt(start),stop: parseInt(stop),text: text, text_normalized:ntext, type:type});
        this.add(item);
    }
});