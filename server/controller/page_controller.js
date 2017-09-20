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
const sys_option = require('../config/sys_option');

var moduel_prefix = sys_option.product_name + '_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var api = server.plugins.services.clothing_api;

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
                if (state[sys_option.cookie_key]) {
                    openid = state[sys_option.cookie_key];
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
                    cookie[sys_option.cookie_key] = openid;
                    return reply.view("index").state('cookie', cookie, sys_option.cookie_options);;
                });
            },
        },

        //登录
        {
            method: 'GET',
            path: '/login',
            handler: function(request, reply) {
              return reply.view("login");
            }
        },

        //个人中心
        {
            method: 'GET',
            path: '/person_center',
            handler: function(request, reply) {
              return reply.view("person_center");
            }
        },

        //商品列表
        {
            method: 'GET',
            path: '/product_list',
            handler: function(request, reply) {
              return reply.view("product_list");
            }
        },

        //注册
        {
            method: 'GET',
            path: '/signup',
            handler: function(request, reply) {
              return reply.view("signup");
            }
        },

        //商品分类
        {
            method: 'GET',
            path: '/product_sort',
            handler: function(request, reply) {
              return reply.view("product_sort");
            }
        },

        //购物车
        {
            method: 'GET',
            path: '/product_cart',
            handler: function(request, reply) {
              return reply.view("product_cart");
            }
        },

        //订单确认
        {
            method: 'GET',
            path: '/order_sure',
            handler: function(request, reply) {
              return reply.view("order_sure");
            }
        },

        //订单详情
        {
            method: 'GET',
            path: '/order_detail',
            handler: function(request, reply) {
              return reply.view("order_detail");
            }
        },

        //订单列表
        {
            method: 'GET',
            path: '/order_list',
            handler: function(request, reply) {
              return reply.view("order_list");
            }
        },

        //搜索
        {
            method: 'GET',
            path: '/search',
            handler: function(request, reply) {
              return reply.view("search");
            }
        },

        //商品详情
        {
            method: 'GET',
            path: '/product_show',
            handler: function(request, reply) {
              return reply.view("product_show");
            }
        },



        //后台用户列表
        {
            method: 'GET',
            path: '/admin_user_list',
            handler: function(request, reply) {
              return reply.view("admin_user_list");
            }
        },

        //后台商品列表
        {
            method: 'GET',
            path: '/admin_product_list',
            handler: function(request, reply) {
              return reply.view("admin_product_list");
            }
        },


        //后台商品图片查看
        {
            method: 'GET',
            path: '/admin_product_img',
            handler: function(request, reply) {
              return reply.view("admin_product_img");
            }
        },

        //后台添加客户
        {
            method: 'GET',
            path: '/admin_add_custom',
            handler: function(request, reply) {
              return reply.view("admin_add_custom");
            }
        },

        //后台登录
        {
            method: 'GET',
            path: '/admin_login',
            handler: function(request, reply) {
              return reply.view("admin_login");
            }
        },




    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
