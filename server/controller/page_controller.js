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
                    wx_api.page_get_access_token(sys_option.platform_id, code, function(err,openid) {
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
			if (state[sys_option.cookie_key]) {
				openid = state[sys_option.cookie_key];
			}
		}
		cb(openid);
    };

    //登入，合并设置cookie
    var login_set_cookie = function(request,person_id){
    	var state;
    	if (request.state && request.state.cookie) {
    		state = request.state.cookie;
    		state.person_id = person_id;
    	}else {
    		state = {person_id:person_id};
    	}
    	return state;
    };
    //cooke person
    var get_cookie_person = function(request){
    	var person_id;
    	if (request.state && request.state.cookie) {
    		state = request.state.cookie;
    		if (state.person_id) {
    			person_id = state.person_id;
    		}
    	}
    	return person_id;
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
                            var person_id = get_cookie_person(request);
                            if (!person_id) {
                                //获取微信绑定账号
                                person.get_wx_by_openid(sys_option.platform_id,openid,function(err,content) {
                                    if (content.success && content.rows && content.rows.length > 0) {
                                        var person_id = content.rows[0].person_id;

                                        var state = login_set_cookie(request,person_id);
                                        return reply.view("person_center").state('cookie', state, {ttl:10*365*24*60*60*1000});
                                    } else {
                                        return reply.view("login");
                                    }
                                });
                            } else {
                                return reply.view("person_center");
                            }
                        } else {
                            return reply.redirect("/go2auth/wx_auth");
                        }
                    });
                } else {
                    var person_id = get_cookie_person(request);
                    if (!person_id) {
                        return reply.view("login");
                    } else {
                        return reply.view("person_center");
                    }
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
						cookie[sys_option.cookie_key] = openid;
					}
					return reply.redirect('/person_center').state('cookie', cookie, sys_option.cookie_options);
				});
			}
		},

        //充值
        {
            method: 'GET',
            path: '/clothing_chongzhi',
            handler: function(request, reply) {
                var activity_id = "rc001";
                var p_url = request.connection.info.protocol + '://' + request.info.host + request.url.path;

                page_get_openid(request,function(openid) {
                    if (openid) {
                        wx_api.jsapi_ticket(sys_option.platform_id,p_url, function(err,info) {
                                return reply.view("clothing_chongzhi",{info:info,openid:openid,"activity_id":activity_id});
                        });
                    } else {
                        return reply("请在微信中访问。");
                    }
                });
            }
        },


        //消费信息
        {
            method: 'GET',
            path: '/record',
            handler: function(request, reply) {
              return reply.view("record");
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
        //订单列表
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
                var order_id = request.query.order_id;
              return reply.view("order_detail",{order_id:order_id});
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
