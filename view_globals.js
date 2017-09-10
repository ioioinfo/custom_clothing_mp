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

var view_globals = function(server,request) {
    return {
        domain:'http://127.0.0.1:8000',
        image_host: 'http://211.149.248.241:18000',
        static_host: 'http://static.54865566.com',
        login_html:'<ul class="heardlogin"><li><a href="/user/">Login</a></li></ul>',
        title:'| CHINA SPICE'
    };
};

module.exports = view_globals;
