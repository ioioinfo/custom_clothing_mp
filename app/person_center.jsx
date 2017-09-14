var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
    }
    componentDidMount() {
      var height = $(window).height();
      console.log(height);
      $('.back_bottom').css('height',0.7*height);
      $('.person_center_top').css('height',0.15*height);
      $('.person_center_order').css('top',0.3*height-60);
    }

    render() {
      return (
        <div className="person_center">
          <div className="background"></div>
          <div className="back_bottom"></div>
          <div className="person_center_top">
            <img src="images/biyou.jpg"/>
            <p>187****7203</p>
          </div>

          <div className="person_center_order">
            <div className="person_center_order_infor person_center_order_left">
              <p>1</p>
              <p>待收货</p>
            </div>
            <div className="person_center_order_infor person_center_order_right">
              <p>11</p>
              <p>历史订单</p>
            </div>
          </div>
          <div className="weui-tabbar">
              <a href="javascript:;" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-home"></i></span>
                  <p className="weui-tabbar__label">首页</p>
              </a>
              <a href="javascript:;" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-cart-arrow-down"></i></span>
                  <p className="weui-tabbar__label">购物车</p>
              </a>
              <a href="javascript:;" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-bars"></i></span>
                  <p className="weui-tabbar__label">分类</p>
              </a>
              <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                  <span className="weui-tabbar__icon"><i className="fa fa-user"></i></span>
                  <p className="weui-tabbar__label">我</p>
              </a>
          </div>
        </div>
      );
    }
};

ReactDOM.render(
  <IoIo/>,
  document.getElementById("person_center")
);
