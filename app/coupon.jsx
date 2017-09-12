var React = require('react');
var ReactDOM = require('react-dom');

class IoIo extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {

    }

    render() {
      return (
        <div className="coupon_wrap">
          <CouponInfor/>
        </div>
      );
    }
};

class CouponInfor extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {

    }
    render() {
      return (
        <div className="coupon_infor">
          <ul className="coupon_infor_ul">
            <li className="coupon_infor_li">
              <a href="#">
                <div className="coupon_left pull-left">
                  <div className="coupon_left_infor">
                    <p className="coupon_left_infor_price"><span>￥</span>300</p>
                    <p className="coupon_left_infor_area">满2999元可用</p>
                  </div>
                </div>
                <div className="coupon_right pull-right">
                  <p className="coupon_right_name">精美修身长款旗袍</p>
                  <p className="coupon_right_time">有效期至 : 2017-9-12</p>
                </div>
              </a>
            </li>
            <li className="coupon_infor_li">
              <a href="#">
                <div className="coupon_left pull-left">
                  <div className="coupon_left_infor">
                    <p className="coupon_left_infor_price"><span>￥</span>300</p>
                    <p className="coupon_left_infor_area">满2999元可用</p>
                  </div>
                </div>
                <div className="coupon_right pull-right">
                  <p className="coupon_right_name">精美修身长款旗袍</p>
                  <p className="coupon_right_time">有效期至 : 2017-9-12</p>
                </div>
              </a>
            </li>
            <li className="coupon_infor_li">
              <a href="#">
                <div className="coupon_left pull-left">
                  <div className="coupon_left_infor">
                    <p className="coupon_left_infor_price"><span>￥</span>300</p>
                    <p className="coupon_left_infor_area">满2999元可用</p>
                  </div>
                </div>
                <div className="coupon_right pull-right">
                  <p className="coupon_right_name">精美修身长款旗袍</p>
                  <p className="coupon_right_time">有效期至 : 2017-9-12</p>
                </div>
              </a>
            </li>
            <li className="coupon_infor_li">
              <a href="#">
                <div className="coupon_left pull-left">
                  <div className="coupon_left_infor">
                    <p className="coupon_left_infor_price"><span>￥</span>300</p>
                    <p className="coupon_left_infor_area">满2999元可用</p>
                  </div>
                </div>
                <div className="coupon_right pull-right">
                  <p className="coupon_right_name">精美修身长款旗袍</p>
                  <p className="coupon_right_time">有效期至 : 2017-9-12</p>
                </div>
              </a>
            </li>
            <li className="coupon_infor_li">
              <a href="#">
                <div className="coupon_left pull-left">
                  <div className="coupon_left_infor">
                    <p className="coupon_left_infor_price"><span>￥</span>300</p>
                    <p className="coupon_left_infor_area"> </p>
                  </div>
                </div>
                <div className="coupon_right pull-right">
                  <p className="coupon_right_name">精美修身长款旗袍</p>
                  <p className="coupon_right_time">有效期至 : 2017-9-12</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      );
    }
};




ReactDOM.render(
  <IoIo/>,
  document.getElementById("coupon")
);
