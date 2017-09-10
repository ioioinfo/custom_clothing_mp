/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

exports.register = function(server, options, next){

    var load_module = function(key, path) {
        var module = require(path)(server);
        if (typeof module.init === 'function') { module.init(); }
        if (typeof module.refresh === 'function') { module.refresh(); }
        server.expose(key, module);
    };

    load_module('person', './person.js');
    load_module('things', './things.js');
    load_module('amap', './amap.js');
    load_module('wx_api', './wx_api.js');
    load_module('clothing_api', './clothing_api.js');
    load_module('drp_api', './drp_api.js');
    load_module('fsm', './fsm.js');
    load_module('notify', './notify.js');
    load_module('base', './base.js');
  
    next();
}

exports.register.attributes = {
    name: 'services'
};