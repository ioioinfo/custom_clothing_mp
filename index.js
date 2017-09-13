var Hapi = require('hapi');
// Create a server with a host and port
var server = new Hapi.Server();

// Setup the server with a host and port
server.connection({
    port: parseInt(process.env.PORT, 10) || 18039,
    host: '0.0.0.0'
});

// Setup the views engine and folder
server.register(require('vision'), (err) => {
    if (err) {
        throw err;
    }

    var swig = require('swig');
    swig.setDefaults({ cache: false });

    server.views({
        engines: {
            html: swig
        },
        isCached: false,
        relativeTo: __dirname,
        encoding: 'utf8',
        path: './server/views'
    });
});

server.state('cookie', {
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false,
    strictHeader: true
});

module.exports = server;

server.register([
    {
        register: require("good"),
        options: {
            ops: false,
            reporters: {
                myConsoleReporter: [{
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, {
        register: require('./server/utils/cache.js')
    }, {
        register: require('./server/db/db_mysql.js')
    }, {
        register: require('./server/services/services.js')
    }, {
        register: require('./server/assets/index.js')
    }, {
        register: require('./server/utils/g.js'),
        options: require('./view_globals.js')
    }, {
        register: require('./server/controller/index_controller.js')
    }, {
        register: require('./server/controller/page_controller.js')
    }, {
        register: require('./server/controller/wx_controller.js')
    }, {
        register: require('./server/controller/data_controller.js')
    }, {
        register: require('./server/controller/person_controller.js')
    },

    ], function () {
        server.start(function() {
        console.log('Server started at: ' + server.info.uri);
    });
});
