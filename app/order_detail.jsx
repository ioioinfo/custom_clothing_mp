var React = require('react');
var ReactDOM = require('react-dom');

class Warp extends React.Component {
  render() {
      return (
        <div className="order_detail_wrap">
            <Title/>
            <Statu/>
            <ProductInfo/>
            <ProductInfo/>
            <Call/>
            <PayInfor/>
        </div>
      );
  }
};

class Title extends React.Component {
  render() {
      return (
        <div className="order_detail_title">订单详情</div>
      );
  }
};

class Statu extends React.Component {
  render() {
      return (
        <div className="order_detail_address_wrap">
            <div className="address_icon_wrap">
                <i className="fa fa-clock-o address_icon"></i>
            </div>
            <span className="address_word">物流配送中</span>
        </div>
      );
  }
};

class ProductInfo extends React.Component {
  render() {
      return (
        <div className="product-infor" data-id="00137208_C25">
            <div className="all">
                <div className="product-infor-left"><img src="http://image.buy42.com/00137208C.jpg" alt=""/></div>
                <div className="product-infor-middle">
                    <p className="p1">HUGO BOSS红外线健康功能被 提高睡眠质量 家居日用</p>
                    <p className="p2">￥ 660</p>
                </div>
                <div className="product-infor-right">
                    <p>x1</p>
                </div>
            </div>
        </div>
      );
  }
};
class PayInfor extends React.Component {
  render() {
      return (
        <div className="order_detail_pay_wrap">
            <div className="order_detail_pay_infor">
                <div>支付方式</div>
                <div>支付宝</div>
            </div>
            <div className="order_detail_pay_infor">
                <div>商品价格</div>
                <div>¥ 100.00</div>
            </div>
            <div className="order_detail_pay_infor">
                <div>其他费用</div>
                <div>¥ 0.00</div>
            </div>
        </div>
      );
  }
};
class Call extends React.Component {
  render() {
      return (
        <div className="call_me_wrap"><i className="fa fa-phone call_me"></i>联系我们</div>
      );
  }
};
ReactDOM.render(
  <Warp/>,
  document.getElementById("order_detail")
);
