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
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');
const sys_option = require('../config/sys_option');
const uu_request = require('../utils/uu_request');

var moduel_prefix = sys_option.product_name + '_data';

exports.register = function(server, options, next) {
    var service_info = sys_option.desc;
    var platform_id = sys_option.platform_id;
    //短信平台编号
    var sms_platform_code = "hrbs";
    
    var api = server.plugins.services["4s_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;
    var base = server.plugins.services.base;

    //页面获取微信id
    var page_get_openid = function(request,cb) {
        var state;
        var openid = "";

        if (request.state && request.state.cookie) {
            state = request.state.cookie;
            if (state[sys_option.cookie_key]) {
                openid = state[sys_option.cookie_key];
            }
        }
        if (openid) {
            console.log("data api cookie openid:" + openid);
            cb(openid);
        } else {
            cb(null);
        }
    };

    var get_person = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        cb(rows[0]);
                    } else {
                        cb(null);
                    }
                });
            }
        });
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
        //获取门店二维码图片路径
        {
            method: 'GET',
            path: '/get_store_qrcode',
            handler: function(request, reply) {
                var store_code = request.query.store_code;
                if (!store_code) {
                    return reply({"success":false,"message":"param store_code is null","service_info":service_info});
                }
                
                //二维码参数
                var scene = "store::code::" + store_code;
                
                //查询基础信息标签
                var base_type = "store";
                var base_id = store_code;
                var tag_type = "qrcode";
                var tag_value;
                
                //查询缓存数据
                tag_value = server.plugins.cache.store.get(scene);
                if (tag_value) {
                    return reply({"success":true,"message":"ok","url":tag_value,"service_info":service_info});
                }
                
                base.get_tag_by_base_info(base_type,base_id,function(err,content) {
                    if (err) {
                        return reply({"success":false,"message":"error","service_info":service_info});
                    }
                    
                    var tags = content.rows;
                    
                    _.each(tags,function(tag) {
                        if (tag.tag_type == tag_type) {
                            tag_value = tag.tag_value;
                            server.plugins.cache.store.set(scene,tag_value);
                            
                            return reply({"success":true,"message":"ok","url":tag_value,"service_info":service_info});
                        }
                    });
                    
                    if (!tag_value) {
                        //调用微信接口生成二维码
                        wx_api.create_qrcode(platform_id,scene,function(err,url) {
                            if (err) {
                                return reply({"success":false,"message":"wx api error","service_info":service_info});
                            }
                            
                            tag_value = url;
                            
                            //保存基础信息标签
                            base.add_tag(base_type, base_id,tag_type,tag_value,function(err,content) {
                                if (err) {
                                    return reply({"success":false,"message":"wx api error","service_info":service_info});
                                }
                                
                                server.plugins.cache.store.set(scene,tag_value);
                                
                                return reply({"success":true,"message":"ok","url":tag_value,"service_info":service_info});
                            });
                        });
                    }
                });
            },
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
