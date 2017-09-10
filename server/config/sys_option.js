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

// 系统配置
var sys_option = {};

//软件名称
sys_option.product_name = "custom_clothing_mp";

sys_option.desc = "custom clothing mp service";

//微信公众号编号
sys_option.platform_id = "hrbs_service";
sys_option.wx_token = "uuinfo_weixin";

//cookie
sys_option.cookie_options = {ttl:10*365*24*60*60*1000};
sys_option.cookie_key = sys_option.platform_id + "_clothing_mp_cookie";

module.exports = sys_option;