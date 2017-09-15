// These are the public assets. Goal is to serve css, js, partials, images, or bower packages.
exports.register = function(server, options, next){
  var Inert = require('inert');
  server.register(Inert, function () {
    server.route([
        {
            method: 'GET',
            path: '/partials/{path*}',
            handler: {
                directory: { path: './server/views/partials' }
            }
        },
        {
            method: 'GET',
            path: '/images/{path*}',
            handler: {
                directory: { path: './public/images' }
            }
        },
        {
            method: 'GET',
            path: '/img/{path*}',
            handler: {
                directory: { path: './public/img' }
            }
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            handler: {
                directory: { path: './public/css' }
            }
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            handler: {
                directory: { path: './public/js' }
            }
        },
        {
            method: 'GET',
            path: '/fonts/{path*}',
            handler: {
                directory: { path: './public/fonts' }
            }
        },
        {
            method: 'GET',
            path: '/bower_components/{path*}',
            handler: {
                directory: { path: './public/bower_components' }
            }
        },
        {
            method: 'GET',
            path: '/upload/{path*}',
            handler: {
                directory: { path: './public/upload' }
            }
        }
    ]);
  });

    next();
}

exports.register.attributes = {
    name: 'assets'
};
