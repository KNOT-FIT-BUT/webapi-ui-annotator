function Ajax(master) {
    this.id = 1;
    this.master = master;
}


Ajax.prototype = {

    send: function (method, params, mods) {
        var jsonrpc = {"jsonrpc": "2.0", "method": method, "params": params, "id": this.id++, "mods": mods};
        $.ajax({
            type: "POST",
            url: "/api/HTTP/jsonrpc",
            data: JSON.stringify(jsonrpc),
            contentType: "application/json",
            processData: false,
            dataType: "json",
            success: $.proxy(this.recieve, this),
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("some shit happend" + errorThrown);
            }

        });

    },


    recieve: function (data) {
        if (data.hasOwnProperty("jsonrpc") && data.hasOwnProperty("result")) {
            this.master.onNetworkEvent(data["source"], data["result"], data["mods"]);
        }
    }
}

module.exports = Ajax;