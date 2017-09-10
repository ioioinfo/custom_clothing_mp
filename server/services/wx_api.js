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

var host = "http://211.149.248.241:16005/";

var nav = function(server) {
    return {
        get_token: function(platform_id,cb) {
            var url = host + "get_token?platform_id=" + platform_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //获取页面授权信息
        page_get_access_token: function(platform_id,code,cb) {
            var url = host + "page_get_access_token?platform_id=" + platform_id + "&code=" + code;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    
                    cb(err,info.openid);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //页面js授权
        jsapi_ticket: function(platform_id,p_url,cb) {
            //网站地址转义
            p_url = encodeURIComponent(p_url);
            
            var url = host + "jsapi_ticket?platform_id=" + platform_id + "&p_url=" + p_url;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    
                    cb(err,info.info);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //获取授权网址
        get_go2auth_url: function(platform_id,m_host,path,cb) {
            var url = host + "get_go2auth_url?platform_id=" + platform_id + "&host=" + m_host + "&path=" + path;
            uu_request.do_get_method(url, function(err, content) {
                if (!err) {
                    cb(err,content);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        get_user_info: function(platform_id,openid,cb) {
            var url = host + "get_user_info?platform_id=" + platform_id + "&openid=" + openid;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var row = {};
                    if (info.success) {
                        row = info["row"];
                    }
                    cb(err,row);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //生成二维码
        create_qrcode: function(platform_id,scene,cb) {
            var url = host + "create_qrcode?platform_id=" + platform_id + "&scene=" + scene;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    
                    if (info.success) {
                        cb(err,info.url);
                    } else {
                        cb(true,null);
                    }
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },

        bind_user: function(openid,nickname,sex,headimgurl,unionid,scene,cb) {
            var url = host + "bind_user";
            var data = {openid:openid,nickname:nickname,sex:sex,headimgurl:headimgurl,unionid:unionid,scene:scene};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        //微信卡号解密
        decrypt_code: function(platform_id,encrypt_code,cb) {
            var url = host + "decrypt_code";
            var data = {"platform_id":platform_id,"encrypt_code":encrypt_code};
            
            uu_request.do_post_method(url, data, function(err, content) {
                if (!err) {
                    cb(err,content);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
    };
};

module.exports = nav;