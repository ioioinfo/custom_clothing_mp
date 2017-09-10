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
    var api = server.plugins.services["4s_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;

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
                person.get_wx_by_openid(sys_option.platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        cb(rows[0]);
                    } else {
                        cb(null);
                    }
                });
            }
        });
    };

    //查询车架号
    var get_vin_no = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(sys_option.platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        var person = rows[0];

                        //查询车架号
                        things.get_car_by_person(person.person_id,function(err,rows) {
                            if (rows && rows.length > 0) {
                                cb(rows[0].vin_no);
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

    //查询手机号
    var get_mobile = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(sys_option.platform_id,openid,function(err,rows) {
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
        //汽车信息
        {
            method: 'GET',
            path: '/search_car_info',
            handler: function(request, reply) {
                get_person(request,function(row) {
                    if (!row) {
                        return reply({"success":false,"message":"获取用户信息失败"});
                    }
                    person.get_contract(row.person_id,function(err,rows) {
                        if (!rows || rows.length == 0) {
                            return reply({"success":false,"message":"获取用户签单信息失败"});
                        }

                        var contract_id = rows[0].hetongbianhao;
                        api.search_car_info(contract_id,function(err,rows){
                            if (!err) {
                                return reply({"success":true,"rows":rows});
                            }else {
                                return reply({"success":false,"message":rows.message});
                            }
                        });

                    });
                });
            },
        },
        
        //保存预约
        {
            method: 'POST',
            path: '/save_appointment',
            handler: function(request, reply) {
                page_get_openid(request,function(open_id) {

                    if (!open_id) {
                        return reply({"success":false,"message":"获取用户open_id失败"});
                    }
                    var mendian = request.payload.mendian;
                    var customer_name = request.payload.customer_name;
                    var mobile = request.payload.mobile;
                    var sex = request.payload.sex;
                    var chexi_id = request.payload.chexi_id;
                    var chexing_id = request.payload.chexing_id;
                    var appointment_date = request.payload.appointment_date;
                    if (!customer_name||!mobile||!sex||!chexi_id||!chexing_id||!appointment_date
                    || !mendian || !open_id) {
                        return reply({"success":false,"message":"params err"});
                    }
                    var data = {
                        "open_id":open_id,
                        "mendian":mendian,
                        "customer_name":customer_name,
                        "mobile":mobile,
                        "sex":sex,
                        "chexi_id":chexi_id,
                        "chexing_id":chexing_id,
                        "appointment_date":appointment_date
                    };

                    api.save_appointment(data,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"message":rows.message});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
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
