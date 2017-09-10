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

var _ = require('lodash');
var moment = require('moment');
var eventproxy = require('eventproxy');

var moduel_prefix = 'custom_clothing_mp_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var api = server.plugins.services.clothing_api;

    var platform_id = "clothing_service";

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = platform_id + "_clothing_mp_cookie";

    //页面获取微信id
    var page_get_openid = function(request,cb) {
        var state;
        var openid = "";

        if (request.query.openid) {
            openid = request.query.openid;
            cb(openid);
        } else {
            if (request.state && request.state.cookie) {
                state = request.state.cookie;
                if (state[cookie_key]) {
                    openid = state[cookie_key];
                }
            }
            if (openid) {
                console.log("cookie openid:" + openid);
                cb(openid);
            }else {
                // cb("owHd9s_erpLPfU4uv0uiGzB1JeOI");
                var code = request.query.code;
                if (!code) {
                    cb(null);
                } else {
                    wx_api.page_get_access_token(platform_id, code, function(err,openid) {
                        console.log("page openid:" + openid);
                        cb(openid);
                    });
                }
            }
        }
    };

    //查询手机号
    var get_mobile = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        var row = rows[0];

                        //查询手机号
                        person.get_mobile(row.person_id,function(err,rows) {
                            if (rows && rows.length > 0) {
                                cb(rows[0].mobile);
                            } else {
                                cb(null);
                            }
                        });
                    } else {
                        cb(null);
                    }
                });
            }
        });
    };

    server.route([
        //首页
        {
            method: 'GET',
            path: '/index',
            handler: function(request, reply) {
                page_get_openid(request,function(openid) {
                    if (!openid) {
                        return reply("获取用户信息失败");
                    }
                    var cookie = request.state.cookie;
                    if (!cookie) {
                        cookie = {};
                    }
                    cookie[cookie_key] = openid;
                    return reply.view("index").state('cookie', cookie, cookie_options);;
                });
            },
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
