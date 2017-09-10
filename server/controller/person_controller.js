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

        //绑定用户合同信息
        {
            method: 'POST',
            path: '/bind_person_contract',
            handler: function(request, reply) {
                var openid = request.payload.openid;
                if (!openid) {
                    return reply({"success":false,"message":"param openid is null"});
                }

                var username = request.payload.username;
                var person_name = request.payload.person_name;
                var mobile = request.payload.mobile;
                //合同编号
                var hetongbianhao = request.payload.hetongbianhao;
                //数据来源
                var data_source = "扫描业务员二维码";

                if (!username) {
                    return reply({"success":false,"message":"param username is null"});
                }
                if (!person_name) {
                    return reply({"success":false,"message":"param person_name is null"});
                }
                if (!mobile) {
                    return reply({"success":false,"message":"param mobile is null"});
                }
                if (!hetongbianhao) {
                    return reply({"success":false,"message":"param hetongbianhao is null"});
                }

                //查询签单信息
                api.search_dingche_info(hetongbianhao,function(err,rows) {
                    if (err) {
                        return reply({"success":false,"message":"网络错误"});
                    }
                    if (!rows || rows.length == 0) {
                        return reply({"success":false,"message":"未找到签单信息"});
                    }

                    var row = rows[0];
                    //判断签单人手机号
                    if (row.mobile != mobile) {
                        return reply({"success":false,"message":"签单人手机号不一致，请修改。"});
                    }

                    //合同名称
                    var name = "弘仁购车合同";
                    //签单日期
                    var signed_date = row.the_date;

                    person.save_person(username,person_name,mobile,data_source,function(err,content) {
                        if (err) {
                            return reply({"success":false,"message":"save person error"});
                        }
                        var person_id = content.person_id;

                        //绑定客户微信信息
                        person.bind_person_wx(person_id,platform_id,openid,function(err,content) {

                        });

                        //发送微信消息
                        notify.contract_status_changed(person_id,signed_date,function(err,content) {

                        });

                        //保存合同
                        person.save_contract(person_id,hetongbianhao,name,signed_date,function(err,content) {
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
                
                var url = "http://139.196.148.40:11111/api/mobile_sms?platform_code=hrbs&send_type=ali_sms&mobile="+mobile;
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

        //会员卡激活申请
        {
            method: 'POST',
            path: '/activate_card_apply',
            handler: function(request, reply) {
                var openid = request.payload.openid;
                if (!openid) {
                    return reply({"success":false,"message":"param openid is null"});
                }

                var username = request.payload.username;
                var person_name = request.payload.person_name;
                var mobile = request.payload.mobile;
                var id_card = request.payload.id_card;
                var vehicle_id = request.payload.vehicle_id;
                var yanzhengma = request.payload.yanzhengma;
                
                //数据来源
                var data_source = "会员卡激活";

                if (!username) {
                    return reply({"success":false,"message":"param username is null"});
                }
                if (!person_name) {
                    return reply({"success":false,"message":"param person_name is null"});
                }
                if (!mobile) {
                    return reply({"success":false,"message":"param mobile is null"});
                }
                if (!id_card) {
                    return reply({"success":false,"message":"param id_card is null"});
                }
                if (!vehicle_id) {
                    return reply({"success":false,"message":"param vehicle_id is null"});
                }
                if (!yanzhengma) {
                    return reply({"success":false,"message":"param yanzhengma is null"});
                }
                
                //判断验证码
                var url = "http://139.196.148.40:11111/api/dy_login";
                var data = {"platform_code":"hrbs","mobile":mobile,"password":yanzhengma};
                
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
                            return reply({"success":false,"message":"申请失败。"});
                        }
    
                        //绑定客户微信信息
                        person.bind_person_wx(person_id,platform_id,openid,function(err,content) {
    
                        });
    
                        //保存会员卡激活申请
                        var data = {"name":person_name,"mobile":mobile,"openid":openid
                        ,"id_card":id_card,"vehicle_id":vehicle_id}
                        api.update_name_and_mobile({"apply":JSON.stringify(data)},function(err,content) {
                            return reply({"success":true,"message":"ok"});
                        });
                    });
                });
            }
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
