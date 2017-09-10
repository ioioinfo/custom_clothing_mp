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

'use strict';
var swig = require('swig');
var parseString = require('xml2js').parseString;

var wx_reply = {
    //微信接口XML处理
    process_xml: function(body, cb) {
        parseString(body, function(err, result) {
            var xml = result.xml;

            var openid = result.xml.FromUserName[0];
            var my_openid = result.xml.ToUserName[0];
            var msg_type = result.xml.MsgType[0];

            var resp = {
                text: function(ret) {
                    return wx_reply.text_resp(openid,my_openid,ret.content);
                },
                news: function(ret) {
                    return wx_reply.news_resp(openid,my_openid,ret.items);
                }
            };

            cb(xml,msg_type,openid,resp);
        });
    },

    //微信回复文本信息
    text_resp: function (to_user,from_user,content) {
        var tpl = `<xml>
<ToUserName><![CDATA[{{ to_user }}]]></ToUserName>
<FromUserName><![CDATA[{{ from_user }}]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[{{ content }}]]></Content>
</xml>`;

        var template = swig.compile(tpl);

        return template({to_user:to_user,from_user:from_user,content:content});
    },

    //微信回复图片信息
    image_resp: function(to_user,from_user,media_id) {
        var tpl = `<xml>
<ToUserName><![CDATA[{{ to_user }}]]></ToUserName>
<FromUserName><![CDATA[{{ from_user }}]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[image]]></MsgType>
<Image>
<MediaId><![CDATA[{{ media_id }}]]></MediaId>
</Image>
</xml>`;

        var template = swig.compile(tpl);

        return template({to_user:to_user,from_user:from_user,media_id:media_id});
    },

    //微信回复图文信息
    news_resp: function(to_user,from_user,items) {
        var tpl = `<xml>
<ToUserName><![CDATA[{{ to_user }}]]></ToUserName>
<FromUserName><![CDATA[{{ from_user }}]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>{{ items.length }}</ArticleCount>
<Articles>
{% for item in items %}
<item>
<Title><![CDATA[{{ item.title }}]]></Title> 
<Description><![CDATA[{{ item.description }}]]></Description>
<PicUrl><![CDATA[{{ item.pic_url|safe }}]]></PicUrl>
<Url><![CDATA[{{ item.url|safe }}]]></Url>
</item>
{% endfor %}
<item>
</Articles>
</xml>`;

        var template = swig.compile(tpl);

        return template({to_user:to_user,from_user:from_user,items:items});
    }
};

module.exports = wx_reply;