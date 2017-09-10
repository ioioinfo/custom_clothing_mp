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
var crypto = require('crypto');
var moment = require('moment');
var eventproxy = require('eventproxy');

const util = require('util');
const sys_option = require('../config/sys_option');
const uu_request = require('../utils/uu_request');
const wx_reply = require('../utils/wx_reply');

var moduel_prefix = sys_option.product_name + '_wx';

exports.register = function(server, options, next) {
    var service_info = sys_option.desc;
    var host = "http://4s.ioioinfo.com/";
    
    var platform_id = sys_option.platform_id;
    
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var fsm = server.plugins.services.fsm;
    
    //签名验证
    var check_signature = function(signature,token,timestamp,nonce) {
        var shasum = crypto.createHash('sha1');
        arr = [token,timestamp,nonce].sort();
        shasum.update(arr.join(''));
        
        return shasum.digest('hex') === signature;
    };
    
    server.route([
        //微信验证
        {
            method: 'GET',
            path: '/MP_verify_MliAnvQ9HnZhE5hX.txt',
            handler: function(request,reply) {
                return reply("MliAnvQ9HnZhE5hX");
            }
        },
        
        //弘仁微信
        {
            method: 'GET',
            path: '/MP_verify_mRSVGKGzisaYbGb0.txt',
            handler: function(request,reply) {
                return reply("mRSVGKGzisaYbGb0");
            }
        },
        
        {
            method: 'GET',
            path: '/wechat',
            handler: function(request, reply) {
                var echostr = request.query.echostr;
                var signature = request.query.signature;
                var timestamp = request.query.timestamp;
                var nonce = request.query.nonce;
                var token = sys_option.wx_token;
                
                var check = check_signature(signature,token,timestamp,nonce);
                
                if (check) {
                    return reply(echostr);
                } else {
                    return reply("入口错误");
                }
            },
        },
        
        {
            method: 'POST',
            path: '/wechat',
            handler: function(request, reply) {
                var body = request.payload;
                
                //状态机
                var act_time = moment().format("YYYY-MM-DD HH:mm:ss");
                var point = platform_id;
                
                wx_reply.process_xml(body, function(xml,msg_type,openid,resp) {
                    if (msg_type == "text") {
                        var content = xml.Content[0];
                        
                        //获取用户信息
                        person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                            if (rows && rows.length > 0) {
                                var row = rows[0];
                                var person_id = row.person_id;
                                var act_options = {"act_type":"wx_text","act_content":content};
                                
                                fsm.car4s_act(act_time, point,person_id,JSON.stringify(act_options),function(err,body) {
                                    if (body.info) {
                                        var info = JSON.parse(body.info);
                                        if (info.type == "text") {
                                            return reply(resp.text({content:info.text}));
                                        } else {
                                            return reply(resp.text({content:"你好"}));
                                        }
                                    } else {
                                        return reply(resp.text({content:"你好"}));
                                    }
                                });
                            } else {
                                return reply(resp.text({content:"你好"}));
                            }
                        });
                    } else if (msg_type == "image") {
                        //图片地址
                        var pic_url = xml.PicUrl[0];
                        
                        //获取用户信息
                        person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                            if (rows && rows.length > 0) {
                                var row = rows[0];
                                var person_id = row.person_id;
                                var act_options = {"act_type":"wx_image","act_content":pic_url};
                                
                                fsm.car4s_act(act_time, point,person_id,JSON.stringify(act_options),function(err,body) {
                                    if (body.info) {
                                        var info = JSON.parse(body.info);
                                        if (info.type == "text") {
                                            return reply(resp.text({content:info.text}));
                                        } else {
                                            return reply(resp.text({content:"你好"}));
                                        }
                                    } else {
                                        return reply(resp.text({content:"你好"}));
                                    }
                                });
                            } else {
                                return reply(resp.text({content:"接收到图片:"+pic_url}));
                            }
                        });
                    } else if (msg_type == "event") {
                        var event = xml.Event[0];
                        //事件消息
                        if (event == "scancode_waitmsg") {
                            //扫码推事件且弹出“消息接收中”提示框
                            var content = xml.ScanCodeInfo[0].ScanResult[0];
                            
                            //获取用户信息
                            person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                                if (rows && rows.length > 0) {
                                    var row = rows[0];
                                    var person_id = row.person_id;
                                    var act_options = {"act_type":"wx_scancode","act_content":content};
                                    
                                    fsm.car4s_act(act_time, point,person_id,JSON.stringify(act_options),function(err,body) {
                                        if (body.info) {
                                            var info = JSON.parse(body.info);
                                            if (info.type == "text") {
                                                return reply(resp.text({content:info.text}));
                                            } else {
                                                return reply(resp.text({content:"你好"}));
                                            }
                                        } else {
                                            return reply(resp.text({content:"你好"}));
                                        }
                                    });
                                } else {
                                    return reply(resp.text({content:"接收到图片:"+pic_url}));
                                }
                            });
                        } else if (event == "subscribe") {
                            //关注事件
                            //扫码参数
                            var scene = xml.EventKey[0];
                            if (scene && scene.substr(0,8) == "qrscene_") {
                                scene = scene.substr(8);
                            } else {
                                scene = null;
                            }
                            
                            //获取微信用户信息
                            wx_api.get_user_info(platform_id,openid, function(err,info) {
                                if (err) {
                                    return reply(resp.text({content:"获取用户信息错误"}));
                                }
                                var nickname = info["nickname"];
                                var sex = info["sex"];
                                var headimgurl = info["headimgurl"];
                                var unionid = info["unionid"];
                                
                                person.save_wx(platform_id,openid,nickname,sex,headimgurl,unionid,scene, function(err,result) {
                                    //如果是扫描的门店二维码，处理来源
                                    if (scene) {
                                        var store_code;
                                        if (scene.substr(0,7) == "store::code::") {
                                            store_code = scene.substr(13);
                                        }
                                        
                                        //保存来源记录
                                        var source_code = store_code;
                                        var source_name = "store";
                                        person.add_wx_source(platform_id,openid,source_code,source_name,function(err,content) {
                                            console.log("add_wx_source:");
                                            console.log(content);
                                        });
                                    }
                                    
                                    return reply(resp.text({content:"终于等到你"}));
                                });
                            });
                        } else if (event == "unsubscribe") {
                            person.unsubscribe(platform_id, openid, function(err,result) {
                                return reply("");
                            });
                        } else {
                            return reply("");
                        }
                    }
                });
            },
        },
        
        //授权页面跳转
        {
            method: 'GET',
            path: '/go2auth/{key}',
            handler: function(request, reply) {
                var path = request.params.key;
                wx_api.get_go2auth_url(platform_id,host,path,function(err,body) {
                    return reply.redirect(body.url);
                });
            }
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
