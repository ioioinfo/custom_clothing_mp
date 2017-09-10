var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');

// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap row">
              <Head/>
              <Activity/>
              <Maintenance/>

              <Nav/>
              <div className="gif"><img src="images/jiazai1.gif" alt="" /></div>
              <div className="person_information">

                
              </div>
            </div>
        );
    }
};


class Head extends React.Component {
  componentDidMount() {
    $(".person_information").fadeIn(1000);

  }
    render() {

        return (
            <div className="person_head_wrap">
                <Lunbo items={items} rate={rate}/>

            </div>
        );
    }
};
// <div className="person_information">
//   <div className="person_information_img pull-left"><img src="images/me.jpg" alt="" /></div>
//   <div className="person_information_name pull-right"><p>周润花</p><p>唐66</p></div>
// </div>
// 活动
class Activity extends React.Component {
    render() {
        return (

            <div className="person_activity">
              <a className="weui-cell weui-cell_access" href="buy_process">
                <div className="weui-cell__bd">
                    <p>购车流程</p>
                </div>
                <div className="weui-cell__ft">详细信息</div>
             </a>
            </div>
        );
    }
};


// 活动
class Maintenance extends React.Component {
    render() {
        return (
            <div className="person_maintenance">
              <a className="weui-cell weui-cell_access" href="javascript:;">
                <div className="weui-cell__bd">
                    <p>参与活动</p>
                </div>
                <div className="weui-cell__ft">详细信息</div>
             </a>
              <a className="weui-cell weui-cell_access" href="repair_history">
                <div className="weui-cell__bd">
                  <p>维修历史</p>
                </div>
                <div className="weui-cell__ft">详细信息</div>
             </a>
            </div>
        );
    }
};

// 导航
class Nav extends React.Component {
    componentDidMount() {
      $(".nav_public").fadeIn(1000);

    }
    render() {
        return (
            <div className="person_nav">
              <div className="col-xs-4 nav_public"><a href="maintenance_detail"><p className="nav_picture"><img src="images/nav_baoyang.png"/></p><p className="nav_name">保养</p></a></div>
              <div className="col-xs-4 nav_public"><a href="appointment_list"><p className="nav_picture"><img src="images/nav_weixiu.png"/></p><p className="nav_name">维修</p></a></div>
              <div className="col-xs-4 nav_public"><a href="sos"><p className="nav_picture"><img src="images/nav_jiuyuan.png"/></p><p className="nav_name">救援</p></a></div>
              <div className="col-xs-4 nav_public"><a href="my_contract"><p className="nav_picture"><img src="images/nav_baoxian.png"/></p><p className="nav_name">保险</p></a></div>
              <div className="col-xs-4 nav_public"><a href="my_vip"><p className="nav_picture"><img src="images/nav_shijia.png"/></p><p className="nav_name">会员卡</p></a></div>
              <div className="col-xs-4 nav_public"><a href="my_car"><p className="nav_picture"><img src="images/nav_mycar.png"/></p><p className="nav_name">我的车</p></a></div>
            </div>
        );
    }
};

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
