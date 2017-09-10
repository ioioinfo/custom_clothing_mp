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
const uu_request = require('../utils/uu_request');

var moduel_prefix = '4s_mp_web_data';

var platform_id = "hrbs_service";

var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,null);
		}
	});
};
exports.register = function(server, options, next) {
    var api = server.plugins.services["4s_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = platform_id + "_4s_mp_cookie";

    //页面获取微信id
    var page_get_openid = function(request,cb) {
        var state;
        var openid = "";

        if (request.state && request.state.cookie) {
            state = request.state.cookie;
            if (state[cookie_key]) {
                openid = state[cookie_key];
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

    //查询车架号
    var get_vin_no = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(platform_id,openid,function(err,rows) {
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
    //上个月
    var getPreMonth = function(date){
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    };
    server.route([
        //购车流程
        {
            method: 'GET',
            path: '/buy_process_data',
            handler: function(request, reply) {
                get_person(request,function(row) {
                    if (!row) {
                        return reply({"success":false,"message":"获取用户信息失败"});
                    }
                    //获取合同号
                    person.get_contract(row.person_id,function(err,rows) {
                        if (!rows || rows.length == 0) {
                            return reply({"success":false,"message":"获取用户签单信息失败"});
                        }

                        var contract_id = rows[0].hetongbianhao;

                        var ep =  eventproxy.create("shoukuan_info","charge_info","car_info","tiche_info","zhuanghuangs_info","baoxian_info","jiesuan_info","dingche_info","orders","order_details",function(shoukuan_info,charge_info,car_info,tiche_info,zhuanghuangs_info,baoxian_info,jiesuan_info,dingche_info,orders,order_details){
                            return reply({"success":true,"dingche_info":dingche_info,"shoukuan_info":shoukuan_info,"charge_info":charge_info,"jiesuan_info":jiesuan_info,"car_info":car_info,"tiche_info":tiche_info,"zhuanghuangs_info":zhuanghuangs_info,"baoxian_info":baoxian_info,"orders":orders,"order_details":order_details});
                        });

                        api.search_shoukuan_info(contract_id,function(err,rows){
                            if (!err) {
                                var shoukuan_info = rows;
                                ep.emit("shoukuan_info", rows);
                            }else {
                                ep.emit("shoukuan_info", []);
                            }
                        });
                        api.search_charge_info(contract_id,function(err,rows){
                            if (!err) {
                                var charge_info = rows;
                                ep.emit("charge_info", rows);
                            }else {
                                ep.emit("charge_info", []);
                            }
                        });
                        api.search_car_info(contract_id,function(err,rows){
                            if (!err) {
                                var car_info = rows;
                                ep.emit("car_info", rows);
                            }else {
                                ep.emit("car_info", []);
                            }
                        });
                        api.search_tiche_info(contract_id,function(err,rows){
                            if (!err) {
                                var tiche_info = rows;
                                ep.emit("tiche_info", rows);
                            }else {
                                ep.emit("tiche_info", []);
                            }
                        });
                        api.search_zhuanghuangs_info(contract_id,function(err,rows){
                            if (!err) {
                                var zhuanghuangs_info = rows.rows;
                                var orders = rows.orders;
                                var order_details = rows.order_details;
                                ep.emit("zhuanghuangs_info", rows);
                                ep.emit("orders", orders);
                                ep.emit("order_details", order_details);
                            }else {
                                ep.emit("zhuanghuangs_info", []);
                                ep.emit("orders", []);
                                ep.emit("order_details", []);
                            }
                        });
                        api.search_baoxiandengjis(contract_id,function(err,rows){
                            if (!err) {
                                var baoxian_info = rows;
                                ep.emit("baoxian_info", rows);
                            }else {
                                ep.emit("baoxian_info", []);
                            }
                        });
                        api.search_jiesuan_feiyongs(contract_id,function(err,rows){
                            if (!err) {
                                var jiesuan_info = rows;
                                ep.emit("jiesuan_info", rows);
                            }else {
                                ep.emit("jiesuan_info", []);
                            }
                        });
                        api.search_dingche_info(contract_id,function(err,rows){
                            if (!err) {
                                var dingche_info = rows;
                                ep.emit("dingche_info", rows);
                            }else {
                                ep.emit("dingche_info", []);
                            }
                        });
                    });
                });
            },
        },
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
        //更新预约
        {
            method: 'POST',
            path: '/update_appointment_state',
            handler: function(request, reply) {
                page_get_openid(request,function(open_id) {

                    if (!open_id) {
                        return reply({"success":false,"message":"获取用户open_id失败"});
                    }
                    var date = request.payload.date;

                    if (!date) {
                        return reply({"success":false,"message":"date err"});
                    }
                    var data = {
                        "open_id":open_id,
                        "date":date
                    };

                    api.update_appointment_state(data,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"message":rows.message});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });

                });
            },
        },
        //更新预约评价
        {
            method: 'POST',
            path: '/update_recommend',
            handler: function(request, reply) {
                page_get_openid(request,function(open_id) {

                    if (!open_id) {
                        return reply({"success":false,"message":"获取用户open_id失败"});
                    }
                    var recommend = request.payload.recommend;

                    if (!recommend) {
                        return reply({"success":false,"message":"date err"});
                    }
                    var data = {
                        "open_id":open_id,
                        "recommend":recommend
                    };

                    api.update_recommend(data,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"message":rows.message});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });

                });
            },
        },
        //查询预约
        {
            method: 'GET',
            path: '/search_appointment',
            handler: function(request, reply) {
                page_get_openid(request,function(open_id) {
                    if (!open_id) {
                        return reply({"success":false,"message":"获取用户open_id失败"});
                    }
                    api.search_appointment(open_id,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"rows":rows});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //查询维修单
        {
            method: 'GET',
            path: '/search_repair_orders',
            handler: function(request, reply) {
                get_vin_no(request,function(vin_no){
                    if (!vin_no) {
                        return reply({"success":false,"message":"vin_no is null"});
                    }
                    api.search_repair_orders(vin_no,function(err,rows){
                        if (!err) {
                            return reply(rows);
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //意向单
        {
            method: 'GET',
            path: '/get_saleman_intents',
            handler: function(request, reply) {
                get_mobile(request,function(mobile) {
                    if (!mobile) {
                        return reply({"success":false,"message":"mobile is null"});
                    }
                    api.get_employer_info(mobile,function(err,rows){
                        if (!err) {
                            if (rows.length==0) {
                                return reply({"success":false,"message":"查不到员工id"});
                            }
                            var xiaoshouyuan_id = rows[0].id;
                            api.get_saleman_intents(xiaoshouyuan_id,function(err,rows){
                                if (!err) {
                                    return reply({"success":true,"rows":rows});
                                }else {
                                    return reply({"success":false,"message":rows.message});
                                }
                            });
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //业务员客户信息
        {
            method: 'GET',
            path: '/search_customers_info',
            handler: function(request, reply) {
                get_mobile(request,function(mobile) {
                    if (!mobile) {
                        return reply({"success":false,"message":"mobile is null"});
                    }
                    api.get_employer_info(mobile,function(err,rows){
                        if (!err) {
                            if (rows.length==0) {
                                return reply({"success":false,"message":"查不到员工id"});
                            }
                            var yewuyuan_id = rows[0].id;

                            api.search_customers_info(yewuyuan_id,function(err,rows){
                                if (!err) {
                                    return reply({"success":true,"rows":rows});
                                }else {
                                    return reply({"success":false,"message":rows.message});
                                }
                            });

                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //查询意向客户信息
        {
            method: 'POST',
            path: '/save_intent_customer',
            handler: function(request, reply) {
                var client_name = request.payload.client_name;
				var sex = request.payload.sex;
				var xiaoshouyuan_id = request.payload.xiaoshouyuan_id;
				var age_bound = request.payload.age_bound;
				var intent_level = request.payload.intent_level;
				var put_car_type = request.payload.put_car_type;
				var requirement = request.payload.requirement;
				if (!client_name|| !sex|| !xiaoshouyuan_id||
					!age_bound|| !intent_level|| !put_car_type|| !requirement) {
					return reply({"success":false,"message":"params wrong"});
				}
                var data = {
                    "client_name":client_name,
                    "sex":sex,
                    "xiaoshouyuan_id":xiaoshouyuan_id,
                    "age_bound":age_bound,
                    "intent_level":intent_level,
                    "put_car_type":put_car_type,
                    "requirement":requirement
                };

                api.save_intent_customer(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"message":rows.message});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //销售排位
        {
            method: 'GET',
            path: '/search_sale_rank',
            handler: function(request, reply) {
                var date = new Date();
                var date1 = date.toLocaleDateString();
                var arr = date1.split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var day = arr[2];
                if (month.length==1) {
                    month = "0"+month;
                }
                if (day.length==1) {
                    day = "0"+day;
                }
                var date2 = year + '-' + month + '-' + "01";
                var date3 = year + '-' + month + '-' + day;
                api.search_sale_rank(date2,date3,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //待联系客户列表
        {
            method: 'GET',
            path: '/get_saleman_pre',
            handler: function(request, reply) {
                var xiaoshouyuan_id = request.query.xiaoshouyuan_id;
                if (!xiaoshouyuan_id) {
                    return reply({"success":false,"message":"xiaoshouyuan_id is null"});
                }

                api.get_saleman_pre(xiaoshouyuan_id,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //查询销售员业绩
        {
            method: 'GET',
            path: '/search_saleman_business',
            handler: function(request, reply) {

                get_mobile(request,function(mobile) {
                    if (!mobile) {
                        return reply({"success":false,"message":"mobile is null"});
                    }
                    api.get_employer_info(mobile,function(err,rows){
                        if (!err) {
                            if (rows.length==0) {
                                return reply({"success":false,"message":"查不到员工id"});
                            }
                            var yewuyuan_id = rows[0].id;
                            if (!yewuyuan_id) {
                                return reply({"success":false,"message":"yewuyuan_id is null"});
                            }
                            api.search_saleman_business(yewuyuan_id,function(err,rows){
                                if (!err) {
                                    return reply({"success":true,"row":rows.length});
                                }else {
                                    return reply({"success":false,"message":rows.message});
                                }
                            });

                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //保存保养
        {
            method: 'POST',
            path: '/save_maintain_appointment',
            handler: function(request, reply) {
                var name = request.payload.name;
				var phone = request.payload.phone;
				var sex = request.payload.sex;
				var vin_no = request.payload.vin_no;
				var car_brand = request.payload.car_brand;
				var car_type = request.payload.car_type;
				var item = request.payload.item;
				var appoint_date = request.payload.appoint_date;
				var store = request.payload.store;
                if (!name|| !phone|| !sex||
                    !vin_no|| !car_brand|| !car_type|| !item
                    || !appoint_date|| !store) {
                    return reply({"success":false,"message":"params wrong"});
                }
                var data = {
                    "name":name,
                    "phone":phone,
                    "sex":sex,
                    "vin_no":vin_no,
                    "appoint_date":appoint_date,
                    "car_brand":car_brand,
                    "car_type":car_type,
                    "item":item,
                    "store":store
                };

                api.save_maintain_appointment(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //保存维修
        {
            method: 'POST',
            path: '/save_repair_appointment',
            handler: function(request, reply) {
                var name = request.payload.name;
                var phone = request.payload.phone;
                var sex = request.payload.sex;
                var vin_no = request.payload.vin_no;
                var car_brand = request.payload.car_brand;
                var car_type = request.payload.car_type;
                var item = request.payload.item;
                var appoint_date = request.payload.appoint_date;
                var store = request.payload.store;
                if (!name|| !phone|| !sex||
                    !vin_no|| !car_brand|| !car_type|| !item
                    || !appoint_date|| !store) {
                    return reply({"success":false,"message":"params wrong"});
                }
                var data = {
                    "name":name,
                    "phone":phone,
                    "sex":sex,
                    "vin_no":vin_no,
                    "appoint_date":appoint_date,
                    "car_brand":car_brand,
                    "car_type":car_type,
                    "item":item,
                    "store":store
                };

                api.save_repair_appointment(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"message":rows.message});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //查询保养
        {
            method: 'GET',
            path: '/search_maintain_appointment',
            handler: function(request, reply) {
                get_vin_no(request,function(vin_no){
                    if (!vin_no) {
                        return reply({"success":false,"message":"vin_no is null"});
                    }
                    api.search_maintain_appointment(vin_no,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"rows":rows});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //查询维修
        {
            method: 'GET',
            path: '/search_repair_appointment',
            handler: function(request, reply) {
                get_vin_no(request,function(vin_no){
                    if (!vin_no) {
                        return reply({"success":false,"message":"vin_no is null"});
                    }
                    api.search_repair_appointment(vin_no,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"rows":rows});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //预约信息
        {
            method: 'GET',
            path: '/search_appointment_info',
            handler: function(request, reply) {
                api.search_appointment_info(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //预约保养信息
        {
            method: 'GET',
            path: '/search_appointment_repair',
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

                        var ep =  eventproxy.create("mendian","chexings","peizhis",
                        function(mendian,chexings,peizhis){
                            get_vin_no(request,function(vin_no){
                                if (!vin_no) {
                                    return reply({"success":false,"message":"vin_no is null"});
                                }
                                return reply({"success":true,"mendian":mendian,"chexings":chexings,
                                "peizhis":peizhis,"vin_no":vin_no
                                });
                            });
                        });

                        api.search_appointment_info(function(err,rows){
                            if (!err) {
                                ep.emit("mendian", rows.rows);
                                ep.emit("chexings", rows.chexings);
                                ep.emit("peizhis", rows.peizhis);
                            }else {
                                ep.emit("mendian", []);
                                ep.emit("chexings", []);
                                ep.emit("peizhis", []);
                            }
                        });

                    });
                });
            },
        },
        //会员号
        {
            method: 'GET',
            path: '/get_member_info',
            handler: function(request, reply) {
                get_mobile(request,function(mobile) {
                    if (!mobile) {
                        return reply({"success":false,"message":"mobile is null"});
                    }
                    console.log("mobile:"+mobile);
                    api.get_member_info(mobile,function(err,rows){
                        if (!err) {
                            return reply({"success":true,"rows":rows});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    });
                });
            },
        },
        //查询会员信息列表
        {
            method: 'GET',
            path: '/get_members_infos',
            handler: function(request, reply) {
                var params = request.query.params;
                if (!params) {
                    params = {};
                    params = JSON.stringify(params);
                }
                api.get_members_infos(params,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //查询会员信息明细
        {
            method: 'GET',
            path: '/search_member_by_id',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                api.search_member_by_id(id,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //查询会员消费历史查询
        {
            method: 'GET',
            path: '/member_consume_history',
            handler: function(request, reply) {
				var huiyuankafenlei_id = request.query.card_id;
				get_mobile(request,function(mobile) {
                    if (!mobile) {
                        return reply({"success":false,"message":"mobile is null"});
                    }
					api.member_consume_history(huiyuankafenlei_id,mobile,function(err,rows){
	                    if (!err) {
	                        return reply({"success":true,"cost":rows.cost,"income":rows.income});
	                    }else {
	                        return reply({"success":false,"message":rows.message});
	                    }
	                });
                });
            },
        },
        //会员卡状态变化查询
        {
            method: 'GET',
            path: '/member_state_history',
            handler: function(request, reply) {
                var huiyuan_id = request.query.huiyuan_id;
                if (!huiyuan_id) {
                    return reply({"success":false,"message":"huiyuan_id null","service_info":service_info});
                }
                api.member_state_history(huiyuan_id,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"huanka":rows.huanka,"buka":rows.buka,"dongjie":rows.dongjie,"jiedong":rows.jiedong,"qiyong":rows.qiyong,"tingyong":rows.tingyong});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
        //保存会员卡申请
        {
            method: 'POST',
            path: '/save_apply',
            handler: function(request, reply) {
                var apply = request.payload.apply;
				apply = JSON.parse(apply);
				if (!apply.card_id || !apply.encrypt_code || !apply.code || !apply.openid ||  !apply.nickname || !apply.sex || !apply.headimgurl) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "apply":JSON.stringify(apply)
                };

                api.save_apply(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //会员卡姓名，手机更新及状态（已申请）
        {
            method: 'POST',
            path: '/update_name_and_mobile',
            handler: function(request, reply) {
                var apply = request.payload.apply;
				apply = JSON.parse(apply);
				if (!apply.name || !apply.openid || !apply.mobile) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "apply":JSON.stringify(apply)
                };

                api.update_name_and_mobile(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //openid查询
        {
            method: 'GET',
            path: '/search_apply_by_openid',
            handler: function(request, reply) {
                var openid = request.query.openid;
                if (!openid) {
                    return reply({"success":false,"message":"openid is null"});
                }

                api.search_apply_by_openid(openid,function(err,content){
                    if (!err) {
                        return reply({"success":true,"rows":content.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });

            },
        },
		//openid,card_id查询
		{
			method: 'GET',
			path: '/search_apply_by_openid_cardid',
			handler: function(request, reply) {
				var openid = request.query.openid;
				var card_id = request.query.card_id;
				if (!openid || !card_id) {
					return reply({"success":false,"message":"openid or card_id null","service_info":service_info});
				}

				api.search_apply_by_openid_cardid(openid,card_id,function(err,content){
					if (!err) {
						return reply({"success":true,"rows":content.rows});
					}else {
						return reply({"success":false,"message":rows.message});
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
