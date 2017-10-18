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

    //页面获取微信id
	var cookie_get_openid = function(request,cb) {
		var state;
		var openid = "";

		if (request.state && request.state.cookie) {
			state = request.state.cookie;
			if (state[cookie_key]) {
				openid = state[cookie_key];
			}
		}
		cb(openid);
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
              return reply.view("login");;
            }
        },

        //个人中心
        {
            method: 'GET',
            path: '/person_center',
            handler: function(request, reply) {
                //判断是否在微信中浏览
                var user_agent = request.headers["user-agent"].toLowerCase();

                var is_in_wechat = /(micromessenger|webbrowser)/.test(user_agent);
                if (is_in_wechat) {
                    cookie_get_openid(request, function(openid){
                        if (openid) {
                            return reply.view("person_center");
                        } else {
                            return reply.redirect("/go2auth/wx_auth");
                        }
                    });
                } else {
                    return reply.view("login");
                }
            }
        },

        //微信openid
		{
			method: 'GET',
			path: '/wx_auth',
			handler: function(request, reply){
				page_get_openid(request,function(openid) {
					var cookie = request.state.cookie;
					if (!cookie) {
                        cookie = {};
					}
					if (openid) {
						cookie[cookie_key] = openid;
					}
					return reply.redirect('/person_center').state('cookie', cookie, cookie_options);
				});
			}
		},

        //充值
        {
            method: 'GET',
            path: '/clothing_chongzhi',
            handler: function(request, reply) {
              return reply.view("clothing_chongzhi");;
            }
        },


        //消费信息
        {
            method: 'GET',
            path: '/record',
            handler: function(request, reply) {
              return reply.view("record");;
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

        //优惠券
        {
            method: 'GET',
            path: '/coupon',
            handler: function(request, reply) {
              return reply.view("coupon");
            }
        },

        //物流进度
        {
            method: 'GET',
            path: '/logistics',
            handler: function(request, reply) {
              return reply.view("logistics");
            }
        },

        //重置密码
        {
            method: 'GET',
            path: '/reset_password',
            handler: function(request, reply) {
              return reply.view("reset_password");
            }
        },

        //我的资料
        {
            method: 'GET',
            path: '/my_profile',
            handler: function(request, reply) {
              return reply.view("my_profile");
            }
        },
        //我的资料
        {
            method: 'GET',
            path: '/order_list',
            handler: function(request, reply) {
              return reply.view("order_list");
            }
        },
        // 订单详情
        {
            method: 'GET',
            path: '/order_detail',
            handler: function(request, reply) {
              return reply.view("order_detail");
            }
        },

        // 门店列表
        {
            method: 'GET',
            path: '/mendian_list',
            handler: function(request, reply) {
              return reply.view("mendian_list");
            }
        },

        // 公司简介

        {
            method: 'GET',
            path: '/company',
            handler: function(request, reply) {
              return reply.view("company");
            }
        },

        // 联系我们

        {
            method: 'GET',
            path: '/contact',
            handler: function(request, reply) {
              return reply.view("contact");
            }
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
