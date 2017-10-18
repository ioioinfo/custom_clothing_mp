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
var org_code = "ioio";
var platform_code = "weilingshou";

var moduel_prefix = sys_option.product_name + '_data';
//所有get调用接口方法
var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};
//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,null);
		}
	});
};
//处理结果
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
//验证码验证
var check_captcha = function(vertify,cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/verify?cookie_id=" +cookie_id + "&text=" + vertify;
	do_get_method(url,cb);
};
//登入账号验证
var do_login = function(data, cb){
	var url = "http://139.196.148.40:18666/user/login_check";
	do_post_method(url,data,cb);
};
//获取当前cookie cookie_id
var get_cookie_id = function(request){
	var cookie_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.cookie_id) {
			cookie_id = cookie.cookie_id;
		}
	}
	return cookie_id;
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
//得到验证码
var get_vertify = function(mobile,cb){
	var url = "http://139.196.148.40:11111/api/mobile_sms?mobile="+mobile;
	url = url + "&send_type=ali_sms&platform_code="+platform_code;
	do_get_method(url,cb);
};
//注册
var do_register = function(data, cb){
	var url = "http://139.196.148.40:18666/user/register";
	do_post_method(url,data,cb);
};
//vip注册
var do_vip = function(data, cb){
	var url = "http://139.196.148.40:18003/vip/add_vip";
	do_post_method(url,data,cb);
};
//买
var register_activity = function(data,cb){
	var url = "http://211.149.248.241:18004/trigger/register";
	do_post_method(url,data,cb);
};
//充值比例接口
var get_recharge_campaign = function(activity_id, cb){
	var url = "http://211.149.248.241:18004/get_recharge_campaign?campaign_code="+activity_id;
	do_get_method(url,cb);
};
//根据personid找头像
var find_persons = function(persons, cb){
	var url = "http://139.196.148.40:18003/person/get_avatar?person_ids=";
	url = url + persons + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//根据personid找vip
var find_personsVip = function(persons, cb){
	var url = "http://139.196.148.40:18003/vip/list_by_scope_persons?person_ids=";
	url = url + persons + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//根据personid找info
var find_person_info = function(person_id, cb){
	var url = "http://139.196.148.40:18003/person/get_by_id?person_id=";
	url = url + person_id + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//发现vip
var get_person_vip = function(person_id,cb){
	var url = "http://139.196.148.40:18666/vip/get_by_person_id?person_id=" + person_id + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//门店列表
var get_store_list = function(org_code,cb){
	var url = "http://211.149.248.241:19999/store/list?org_code=";
	url = url + org_code;
	do_get_method(url,cb);
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
//保存充值订单
var save_recharge_order = function(data,cb){
	var url = "http://127.0.0.1:18010/save_recharge_order";
	do_post_method(url,data,cb);
};
//支付宝付费
var trade_alipay = function(data,cb){
	var url = "http://139.196.148.40:18008/donate_trade_alipay";
	do_post_method(url,data,cb);
};
var trade_weixinpay = function(data,cb){
	var url = "http://139.196.148.40:18008/wx_mp_pay";
	do_post_method(url,data,cb);
};
//根据状态查询订单
var search_order_byStatus = function(person_id,status,cb){
	var url = "http://127.0.0.1:18010/search_order_byStatus?person_id=";
	url = url + person_id + "&status=" + status;
	do_get_method(url,cb);
}
//得到所有订单
var get_ec_orders = function(person_id,cb){
	var url = "http://127.0.0.1:18010/get_ec_orders?person_id="+person_id;
	do_get_method(url,cb);
};
//根据手机查询账号是否存在
var get_by_mobile = function(mobile,cb){
	var url = "http://139.196.148.40:18003/person/get_by_mobile?mobile=";
	url = url + mobile;
	do_get_method(url,cb);
}
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
        //登入
		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var data = {};
				data.username = request.payload.username;
				data.password = request.payload.password;
				data.platform_code = platform_code;
				data.org_code = org_code;
				if (!data.username||!data.password) {
					return reply({"success":false,"message":"params wrong"});
				}
				var mobile = data.username;
				get_by_mobile(mobile,function(err,row){
                    if (!err) {
						do_login(data, function(err,content){
							if (!err) {
								if (!content.success) {
									return reply({"success":false,"message":"password wrong"});
								}
								var person_id = content.row.person_id;
								if (!person_id) {
									return reply({"success":false,"message":"no account"});
								}

								// 绑定微信账号
                                cookie_get_openid(request,function(openid) {
                                    if (openid) {
                                        //关联微信信息
                                        person.bind_person_wx(sys_option.platform_id,openid,person_id,function(err,content) {
                                            console.log("bind person wx:" + person_id + "," + openid);
                                        });
                                    }

                                    var state = login_set_cookie(request,person_id);
                                    return reply({"success":true,"service_info":service_info}).state('cookie', state, {ttl:10*365*24*60*60*1000});
                                });
							}else {
								return reply({"success":false,"message":content.message});
							}
						});
                    }else {
                        return reply({"success":false,"message":"no username"});
                    }
                });
			}
		},
        //获取验证
        {
            method: 'POST',
            path: '/get_vertify',
            handler: function(request, reply){
                var mobile = request.payload.phone;
                if (!mobile) {
                    return reply({"success":false,"message":"param wrong"});
                }
				get_by_mobile(mobile,function(err,row){
                    if (!err) {
						get_vertify(mobile,function(err,content){
		                    if (!err) {
		                        return reply({"success":true,"message":"ok"});
		                    }else {
		                        return reply({"success":false,"message":content.message});
		                    }
		                });
                    }else {
                        return reply({"success":false,"message":content.message});
                    }
                });
            }
        },
        //微信注册功能
        {
            method: 'POST',
            path: '/do_register',
            handler: function(request, reply){
                var data = {};
                data.mobile = request.payload.mobile;
                data.password = request.payload.password;
                data.username = request.payload.username;
                data.org_code = org_code;
                data.platform_code = platform_code;
                if (!data.password || !data.username || !data.mobile) {
                    return reply({"success":false,"message":"param wrong","service_info":service_info});
                }
                do_register(data,function(err,result){
                    if (!err) {
                        var info = {};
                        info.person_id = result.person_id;
                        info.scope_code = org_code;
                        info.person_name = data.username;
                        info.mobile = data.mobile;
                        do_vip(info,function(err,result){
                            if (true) {
                                var state = login_set_cookie(request,info.person_id);
                                register_activity({"person_id":info.person_id},function(err,content){
                                    if (!err) {
                                        return reply({"success":true,"message":"ok","service_info":service_info}).state('cookie', state, {ttl:10*365*24*60*60*1000});
                                    }else {
                                        return reply({"success":false,"message":content.message,"service_info":service_info});
                                    }
                                });
                            }else {
                                return reply({"success":false,"message":result.message,"service_info":service_info});
                            }
                        })
                    }else {
                        return reply({"success":false,"message":result.message,"service_info":service_info});
                    }
                });
            }
        },
		//充值比例
		{
			method: 'GET',
			path: '/get_recharge_campaign',
			handler: function(request, reply){
				var activity_id = request.query.activity_id;
				get_recharge_campaign(activity_id,function(err,row){
					if (!err) {
						var rates = row.row.rates;
						return reply({"success":true,"rates":rates})
					}else {
						return reply({"success":false,"message":row.message})
					}
				});
			}
		},
		//会员信息
		{
			method: 'GET',
			path: '/member_info',
			handler: function(request, reply){
				// var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
				var ep =  eventproxy.create("persons","personsVip","person_info","person",
					function(persons,personsVip,person_info,person){
					return reply({"success":true,"persons":persons,"personsVip":personsVip,"person_info":person_info,"person":person});
				});
				var person_ids = [person_id];
				find_persons(JSON.stringify(person_ids), function(err, content){
					if (!err) {
						var persons = content.rows;
						ep.emit("persons", persons);
					}else {
						ep.emit("persons", []);
					}
				});
				find_personsVip(JSON.stringify(person_ids), function(err, content){
					if (!err) {
						var personsVip = content.rows;
						ep.emit("personsVip", personsVip);
					}else {
						ep.emit("personsVip", []);
					}
				});
				find_person_info(person_id, function(err, content){
					if (!err) {
						if (!content.row) {
							ep.emit("person_info", {});
						}
						var person_info = content.row;
						ep.emit("person_info", person_info);
					}else {
						ep.emit("person_info", []);
					}
				});
				get_person_vip(person_id, function(err, content){
					if (!err) {
						var person = content.row;
						ep.emit("person", person);
					}else {
						ep.emit("person", []);
					}
				});
			}
		},
		//门店列表
		{
			method: 'GET',
			path: '/get_store_list',
			handler: function(request, reply){
				get_store_list(org_code,function(err,rows){
					if (!err) {
						var store_list = rows.rows;
						return reply({"success":true,"store_list":store_list})
					}else {
						return reply({"success":false,"message":rows.message})
					}
				});
			}
		},
		//充值订单新建
		{
			method: 'GET',
			path: '/add_member_order',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var pay_way = request.query.pay_way;
				var activity_id = request.query.activity_id;
				var marketing_price = request.query.marketing_price;
				var actual_price = request.query.actual_price;
				if (!pay_way||!activity_id||!actual_price||!marketing_price) {
					return reply({"success":false,"message":"params null"});
				}
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				var data = {
					"marketing_price": marketing_price,
					"actual_price": actual_price,
					"activity_id": activity_id,
					"pay_way": pay_way,
					"person_id": person_id
				};
				get_recharge_campaign(activity_id,function(err,row){
					if (!err) {
						var rates = row.row.rates;
						for (var i = 0; i < rates.length; i++) {
							if (rates[i].price1 == data.actual_price) {
								data.marketing_price = rates[i].price;
							}
						}
						save_recharge_order(data,function(err,content){
							if (!err) {
								var order_id = content.order_id;
								if (pay_way=="ali_pay") {
									var info = {
										"sob_id" : sob_id,
										"platform_code" : platform_code,
										"business_code" : "member_recharge",
										"address" : "上海",
										"order_id" : order_id,
										"pay_amount" : actual_price,
										"operator" : person_id,
										"main_role_id" : person_id,
										"subject" : "会员充值",
										"body" : "会员充值",
										"return_url" : "http://shop.buy42.com/pay_success",
										"callback_url" : "http://211.149.248.241:18000/receive_pay_notify"
									};
									trade_alipay(info,function(err,content){
										if (!err) {
											var url = content.url;
											return reply({"success":true,"url":url});
										}else {
											return reply({"success":false,"message":content.message});
										}
									});
								}else {
									var openid = request.query.openid;
									if (!openid) {
										return reply({"success":false,"message":"openid null"});
									}
									var info = {
										"sob_id" : sob_id,
										"platform_code" : platform_code,
										"business_code" : "member_recharge",
										"address" : "上海",
										"order_id" : order_id,
										"pay_amount" : actual_price,
										"operator" : person_id,
										"main_role_id" : person_id,
										"subject" : "会员充值",
										"body" : "会员充值",
										"return_url" : "http://shop.buy42.com/pay_success",
										"callback_url" : "http://211.149.248.241:18000/receive_pay_notify",
										"openid":openid,
										"mp_platform_id":"shantao_dingyue"
									};
									trade_weixinpay(info,function(err,content){
										if (!err) {
											var row = content.row;
											return reply({"success":true,"row":row});
										}else {
											return reply({"success":false,"message":content.message});
										}
									});
								}
							}else {
								return reply({"success":false,"message":content.message});
							}
						});
					}else {
						return reply({"success":false,"message":row.message})
					}
				});
			}
		},
		//订单中心
		{
			method: 'GET',
			path: '/order_center_data',
			handler: function(request, reply){
				var status = request.query.status;
				var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
				// var person_id = get_cookie_person(request);
				// if (!person_id) {
				// 	return reply.redirect("/chat_login");
				// }
				if (status && status !="") {
					search_order_byStatus(person_id,status,function(err,results){
						if (!err) {
							return reply({"success":true,"orders":results.orders,"details":results.details,"products":results.products});
						}else {
							return reply({"success":false,"orders":[],"details":[],"products":[],"messsage":results.messsage});
						}
					});
				}else {
					get_ec_orders(person_id,function(err,results){
						if (!err) {
							return reply({"success":true,"orders":results.orders,"details":results.details,"products":results.products});
						}else {
							return reply({"success":false,"orders":[],"details":[],"products":[],"messsage":results.messsage});
						}
					});
				}
			}
		},



    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
