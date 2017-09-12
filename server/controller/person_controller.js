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
const uu_request = require('../utils/uu_request');

var moduel_prefix = sys_option.product_name + '_person';

exports.register = function(server, options, next) {
    var byd_api = server.plugins.services.byd_api;
    var person = server.plugins.services.person;
    var wx_api = server.plugins.services.wx_api;
    var api = server.plugins.services["4s_api"];
    var notify = server.plugins.services.notify;

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

    server.route([
        //员工绑定
        {
            method: 'POST',
            path: '/employer_check',
            handler: function(request, reply) {
                var username = request.payload.username;
                var password = request.payload.password;

                if (!username) {
                    return reply({"success":false,"message":"param username is null"});
                }
                if (!password) {
                    return reply({"success":false,"message":"param password is null"});
                }

                page_get_openid(request,function(openid) {
                    if (!openid) {
                        return reply({"success":false,"message":"openid is null"});
                    }

                    //判断用户
                    byd_api.employer_check(username,password,function(err,content) {
                        if (err) {
                            return reply({"success":false,"message":content.message});
                        }

                        //绑定用户信息
                        var row = content.row;
                        var username = row.username;
                        var person_name = row.name;
                        var mobile = row.mobile;
                        var department_name = row.department_name;
                        var is_xiaoshou = row.is_xiaoshou;
                        var data_source = "公众号员工绑定";

                        person.save_person(mobile,person_name,mobile,data_source,function(err,result) {
                            if (err) {
                                return reply({"success":false,"message":result.message});
                            }

                            var person_id = result.person_id;
                            var company = "上海弘仁宝升汽车";

                            //绑定用户微信信息
                            person.bind_person_wx(person_id,platform_id,openid,function(err,result) {

                            });

                            //更新二维码
                            wx_api.create_qrcode(platform_id,"person_"+person_id,function(err,url) {
                                if (!err) {
                                    person.update_person_wx_qrcodeurl(platform_id,person_id,url,function(err,result) {

                                    });
                                }
                            });

                            //保存用户工作
                            person.save_job(person_id,company,department_name,is_xiaoshou,function(err,result) {
                                if (err || !result.success) {
                                    return reply({"success":false,"message":result.message});
                                }
                                return reply({"success":true,"message":"ok"});
                            });
                        });
                    });
                });
            }
        },

        //查看员工信息
        {
            method: 'GET',
            path: '/get_person_wx',
            handler: function(request, reply) {
                page_get_openid(request, function(openid) {
                    if (!openid) {
                        return reply({"success":false,"message":"param openid is null"});
                    }
                    person.get_person_wx(platform_id,openid,function(err,rows) {
                        return reply({"success":true,"message":"ok","rows":rows});
                    });
                });
            }
        },

        //刷新用户微信信息
        {
            method: 'POST',
            path: '/refresh_person_wx',
            handler: function(request, reply) {
                page_get_openid(request, function(openid) {
                    if (!openid) {
                        return reply({"success":false,"message":"param openid is null"});
                    }
                    //获取微信用户信息
                    wx_api.get_user_info(platform_id,openid, function(err,info) {
                        if (err) {
                            return reply({"success":false,"message":"error"});
                        }
                        var nickname = info.nickname;
                        var sex = info.sex;
                        var headimgurl = info.headimgurl;
                        var unionid = info.unionid;
                        
                        //更新用户微信信息
                        person.save_wx(platform_id,openid,nickname,sex,headimgurl,unionid,scene, function(err,result) {
                            //调用drp接口更新用户信息
                            
                            return reply({"success":true,"message":"ok"});
                        });
                    });
                });
            }
        },
        
        //发送短信验证码
        {
            method: 'POST',
            path: '/send_sms',
            handler: function(request, reply) {
                //手机号
                var mobile = request.payload.mobile;
                if (!mobile) {
                    return reply({"success":false,"message":"param mobile is null"});
                }
                
                var url = "http://139.196.148.40:11111/api/mobile_sms?platform_code="+sms_platform_code+"&send_type=ali_sms&mobile="+mobile;
                uu_request.do_get_method(url,function(err,content) {
                    if (err) {
                        return reply({"success":false,"message":"error"});
                    }
                    
                    if (!content.success) {
                        return reply({"success":false,"message":content.message});
                    }
                    
                    return reply({"success":true,"message":"ok"});
                });
            }
        },
        
        //绑定会员
        {
            method: 'POST',
            path: '/bind_vip',
            handler: function(request, reply) {
                //获取微信id
                page_get_openid(request,function(open_id) {
                    if (!open_id) {
                        return reply({"success":false,"message":"获取用户open_id失败"});
                    }
                    var mobile = request.payload.mobile;
                    if (!mobile) {
                        return reply({"success":false,"message":"param mobile is null"});
                    }
                    var username = request.payload.mobile;
                    var person_name = request.payload.mobile;
                    
                    //验证码
                    var yanzhengma = request.payload.yanzhengma;
                    if (!yanzhengma) {
                        return reply({"success":false,"message":"param yanzhengma is null"});
                    }
                    
                    //数据来源
                    var data_source = "微信会员注册";
                    
                    //判断验证码
                    var url = "http://139.196.148.40:11111/api/dy_login";
                    var data = {"platform_code":sms_platform_code,"mobile":mobile,"password":yanzhengma};
                    
                    uu_request.do_post_method(url,data,function(err,content) {
                        if (err) {
                            return reply({"success":false,"message":"error"});
                        }
                        
                        if (!content.success) {
                            return reply({"success":false,"message":content.message});
                        }
                        
                        //保存会员信息
                        person.save_person(username,person_name,mobile,data_source,function(err,content) {
                            if (err) {
                                return reply({"success":false,"message":"save person error"});
                            }
                            var person_id = content.person_id;
        
                            if (!person_id) {
                                return reply({"success":false,"message":"注册;失败。"});
                            }
        
                            //绑定客户微信信息
                            person.bind_person_wx(person_id,platform_id,openid,function(err,content) {
        
                            });
        
                            //更新进销存会员信息
                            
                        });
                    });
                });
            },
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
