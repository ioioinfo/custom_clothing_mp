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

var host = "http://211.149.248.241:18005/";

var nav = function(server) {
    return {
        contract_status_changed: function(person_id,the_date,cb) {
            var url = host + "save_notification";
            var message = {"title":"您好，合同已成功提交。","contract_name":"购车合同","the_date":the_date,"status":"签单成功","remark":"点击查看购车流程状态"};
            var options = {"notify_type":"contract_status_changed","mp":{"platform_id":"4s","url":"http://4s.ioioinfo.com/go2auth/buy_process"}};
            
            var data = {"platform_code":"4s","person_id":person_id,"message":JSON.stringify(message)
                ,"options":JSON.stringify(options),"temporary":1};
                
            uu_request.do_post_method(url,data,function(err,content) {
                cb(err,content);
            });
        },
        
    };
};

module.exports = nav;