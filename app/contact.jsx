var React = require('react');
var ReactDOM = require('react-dom');

class Warp extends React.Component {
  render() {
      return (
        <div className="wrap">
            <div className="wrap_title">联系我们</div>
            <Infor/>
        </div>
      );
  }
};

class Infor extends React.Component {
  render() {
      return (
          <div className="order_detail_pay_wrap">
              <div className="order_detail_pay_infor">
                  <div>公司地址</div>
                  <div>上海宝山区呼兰路911弄11号博济智汇园101a</div>
              </div>
              <div className="order_detail_pay_infor">
                  <div>客服电话</div>
                  <div>021-51095181</div>
              </div>
              <div className="order_detail_pay_infor">
                  <div>邮箱</div>
                  <div>haiminluo@ioioinfo.com</div>
              </div>
          </div>
      );
  }
};
ReactDOM.render(
  <Warp/>,
  document.getElementById("contact")
);
