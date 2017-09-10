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

var host = "http://211.149.245.32:8787/";

var nav = function(server) {
    return {
        
        get_by: function(username,password,cb) {
            var url = host + "employer_check";
            var data = {"username":username,"password":password}
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var row = {};
                    if (info.success) {
                        row = info.row;
                    }
                    cb(err,row);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },

        //验证员工信息
        employer_check: function(username,password,cb) {
            var url = host + "employer_check";
            var data = {"username":username,"password":password}
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    if (body.success) {
                        cb(false,{message:"ok","row":body.row});
                    } else {
                        cb(true,{message:body.message});
                    }
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
    };
};

module.exports = nav;