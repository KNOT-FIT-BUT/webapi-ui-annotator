var AmpersandModel = require('./base/model');

module.exports = AmpersandModel.extend({
    modelType: 'asset',
    props: {
        id: 'string',
        name: 'string',
        state: 'number',
        tools: 'array',
        type: 'string',
        description: "string",
        version: "string",
        selected: "bool"
    },

    session: {},

    derived: {
        statusIcon: {
            deps: ['state'],
            fn: function () {
                var icon = "warning sign";//warning
                switch (this.state) {
                    case 0:
                        icon = "radio"; //add
                        break;
                    case 1:
                        icon = "cloud upload"; //remove
                        break;
                    case 2:
                        icon = "wait";
                        break;
                    case 3:
                        icon = "wait";
                        break;
                    case 4:
                        icon = "check circle";
                        break;
                    default:
                }
                return icon;

            }
        },
        controlIcon: {
            deps: ['state'],
            fn: function () {
                var icon = "warning sign";//warning
                switch (this.state) {
                    case 0:
                        icon = "add circle"; //add
                        break;
                    case 1:
                        icon = "remove circle"; //remove
                        break;
                    case 2:
                        icon = "lock";
                        break;
                    case 3:
                        icon = "lock";
                        break;
                    case 4:
                        icon = "remove circle";
                        break;
                    default:
                }
                return icon;

            }
        },
        stateColor: {
            deps: ['state'],
            fn: function () {
                var color = "red";//warning
                switch (this.state) {
                    case 0:
                        icon = ""; //add
                        break;
                    case 1:
                        icon = "yellow"; //remove
                        break;
                    case 2:
                        icon = "orange";
                        break;
                    case 3:
                        icon = "orange";
                        break;
                    case 4:
                        icon = "green";
                        break;
                    default:
                }
                return icon;

            }
        },
        isLoading: {
            deps: ['state'],
            fn: function () {
                var icon = "warning sign";//warning
                switch (this.state) {
                    case 0:
                        icon = ""; //add
                        break;
                    case 1:
                        icon = ""; //remove
                        break;
                    case 2:
                        icon = "asterisk loading icon";
                        break;
                    case 3:
                        icon = "asterisk loading icon";
                        break;
                    case 4:
                        icon = "";
                        break;
                    default:
                        break;
                }
                console.log("asset icon selected ", icon, this.state);
                return icon;

            }
        },
    }


});