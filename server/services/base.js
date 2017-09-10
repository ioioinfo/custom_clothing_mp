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

var host = "http://139.196.148.40:18001/";

var nav = function(server) {
    return {
        //获取基础信息标签
        get_tag_by_base_info: function(base_type, base_id,cb) {
            var url = host + "tag/get_tag_by_base_info?org_code=ioio";
            
            url = url + "&base_type=" + base_type + "&base_id=" + base_id;

            uu_request.do_get_method(url, function(err, content) {
                if (!err) {
                    cb(err,content);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //保存基础信息标签
        add_tag: function(base_type, base_id,tag_type,tag_value,cb) {
            var url = host + "tag/add_tag";
            
            var data = {"org_code":"ioio","base_type":base_type,"base_id":base_id,"tag_type":tag_type,"tag_value":tag_value};

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