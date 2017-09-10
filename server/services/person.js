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
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://211.149.248.241:18003/";

var nav = function(server) {
    return {
        get_wx_by_openid: function(platform_id,openid,cb) {
            var url = host + "person/get_wx_by_openid?platform_id=" + platform_id + "&openid=" + openid;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //保存用户信息
        save_person: function(username,person_name,mobile,data_source,cb) {
            var url = host + "save_person";
            var data = {username:username,person_name:person_name,mobile,data_source:data_source};
            
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //保存工作
        save_job: function(person_id,company,department_name,is_xiaoshou,cb) {
            var url = host + "person/save_job";
            var data = {person_id:person_id,company:company,department_name:department_name,is_xiaoshou:is_xiaoshou};
            
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //保存合同
        save_contract: function(person_id,hetongbianhao,name,signed_date,cb) {
            var url = host + "person/save_contract";
            var data = {person_id:person_id,hetongbianhao:hetongbianhao,name:name,signed_date:signed_date};
            
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //获取合同信息
        get_contract: function(person_id,cb) {
            var url = host + "person/get_contract?person_id=" + person_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //获取手机
        get_mobile: function(person_id,cb) {
            var url = host + "person/get_mobile?person_id=" + person_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },

        save_wx: function(platform_id,openid,nickname,sex,headimgurl,unionid,scene,cb) {
            var url = host + "person/save_wx";
            var data = {platform_id:platform_id,openid:openid,nickname:nickname,sex:sex,headimgurl:headimgurl,unionid:unionid
                ,scene:scene};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //绑定客户微信信息
        bind_person_wx: function(person_id,platform_id,openid,cb) {
            var url = host + "person/bind_person_wx";
            var data = {person_id:person_id,platform_id:platform_id,openid:openid};
            
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //更新用户二维码
        update_person_wx_qrcodeurl: function(platform_id,person_id,qrcodeurl,cb) {
            var url = host + "person/update_person_wx_qrcodeurl";
            var data = {person_id:person_id,platform_id:platform_id,qrcodeurl:qrcodeurl};
            
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        unsubscribe: function(platform_id,openid,cb) {
            var url = host + "person/unsubscribe";
            var data = {platform_id:platform_id,openid:openid};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //获取用户微信来源
        get_latest_wx_source: function(platform_id,openid,cb) {
            var url = host + "source/get_latest?platform_id=" + platform_id + "&openid=" + openid;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },

        add_wx_source: function(platform_id,openid,source_code,source_name,cb) {
            var url = host + "source/add_source";
            var data = {platform_id:platform_id,openid:openid,source_code:source_code,source_name:source_name};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
    };
};

module.exports = nav;