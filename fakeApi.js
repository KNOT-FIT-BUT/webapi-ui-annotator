var _ = require('lodash');

var people = [
    {
        id: 1,
        firstName: 'Henrik',
        lastName: 'Joreteg',
        coolnessFactor: 11
    },

];
var id = 7;

function get(id) {
    return _.findWhere(people, {id: parseInt(id + '', 10)});
}

exports.register = function (server, options, next) {
    server.route({
        method: 'post',
        path: '/api/HTTP/jsonrpc',
        handler: function (request, reply) {
            reply({});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/people',
        handler: function (request, reply) {
            var person = request.payload;
            person.id = id++;
            people.push(person);
            reply(person).code(201);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            reply(found).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) people = _.without(people, found);
            reply(found).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) _.extend(found, request.payload);
            reply(found).code(found ? 200 : 404);
        }
    });

    next();
};

exports.register.attributes = {
    version: '0.0.0',
    name: 'fake_api'
};
