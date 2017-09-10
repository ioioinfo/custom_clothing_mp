var NodeCache = require( "node-cache" );

exports.register = function (server, options, next) {
    var myCache = new NodeCache();
    server.expose('myCache', myCache);
    
    //门店信息缓存
    var storeCache = new NodeCache();
    server.expose('store', storeCache);

    return next();
};

exports.register.attributes = {
    name: 'cache'
};