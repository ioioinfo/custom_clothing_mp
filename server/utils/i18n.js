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
var fs = require('fs')
var path = require('path')
var Gettext = require('node-gettext')
var { po } = require('gettext-parser')

exports.register = function (server, options, next) {
    //国际化
    const translationsDir = './locales';
    const locales = ['en', 'zh_CN'];
    const domain = 'messages';
    
    const gt = new Gettext();
    gt.setTextDomain(domain);
    gt.on('error', error => console.log('oh nose', error))
    
    locales.forEach((locale) => {
        const filename = `${locale}.po`
        const translationsFilePath = path.join(translationsDir, filename)
        const translationsContent = fs.readFileSync(translationsFilePath)
    
        const parsedTranslations = po.parse(translationsContent)
        gt.addTranslations(locale, domain, parsedTranslations)
    });
    
    var _n = function(text,locale) {
        if (!locale) {
            locale = "zh_CN";
        }
        gt.setLocale(locale);
        var str = gt.gettext(text);
        return str;
    }
    
    server.expose('_n', _n);
    
    //页面参数
    server.ext('onPostHandler', function (request, reply) {
        var response = request.response;
        
        if (response.variety === 'view') {
            if(_.isEmpty(response.source.context)){
                response.source.context = {};
            }
            
            var i18n = {
                _n : function(text,locale) {
                    var state = request.state;
                    if (!locale && state && state.cookie) {
                        locale = state.cookie.locale;
                    }
                    if (!locale) {
                        locale = "zh_CN";
                    }
                    gt.setLocale(locale);
                    var str = gt.gettext(text);
                    return str;
                }
            };

            response.source.context = _.merge(i18n,response.source.context);
        }
        return reply.continue();
    });
        
    return next();
};

exports.register.attributes = {
    name: 'i18n'
};