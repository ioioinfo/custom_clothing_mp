var NodeCache = require( "node-cache" );

exports.register = function (server, options, next) {
    var myCache = new NodeCache();
    server.expose('myCache', myCache);

    return next();
};

exports.register.attributes = {
    name: 'cache'
};