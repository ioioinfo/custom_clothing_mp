var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


function product(state, action) {
  switch (action.type) {
  case 'ORDER_DETAIL':
    {
      $.ajax({
         url: "/order_detail_data?order_id="+order_id,
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
             store.dispatch({ type: 'GET_DATA', data: data});
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

      return state;
    }
  case 'GET_DATA':
  {
    var data = action.data;
    var details = [];
    if (data.details[order_id]) {
        details = data.details[order_id];
    }
    return {items:data.order,products:data.products,details:details,logistics_info:data.logistics_info,pay_info:data.pay_info[0]};
  }

  default:
    return state
  }
}

let store = createStore(product,{items:{},details:[],products:{},logistics_info:{},pay_info:{}});

const mapStateToProps = (state) => {
    return {
        items: state.items,
        products: state.products,
        details: state.details,
        logistics_info: state.logistics_info,
        pay_info: state.pay_info,
    }
}


class IoIo extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
        store.dispatch({ type: 'ORDER_DETAIL'});
    }

    render() {
      return (
        <div className="order_detail_wrap">
            <div className="order_detail_title">
                订单详情
            </div>
            <OrderDetailAddress/>
            {this.props.details.map((item,index)=>(
                <OrderDetail product={item} key={index} />
            ))}
            <div className="call_me_wrap"><i className="fa fa-phone call_me"></i><a href="contact">联系我们</a></div>
            <PayDetail/>
        </div>
      );
    }
};
//物流状态
class OrderDetailAddressClass extends React.Component {
    render() {
      return (
        <div className="order_detail_address_wrap">
            <div className="address_icon_wrap">
                <i className="fa fa-clock-o address_icon"></i>
            </div>
            <span className="address_word">{this.props.logistics_info.detail_desc}</span>
        </div>
      );
    }
};

//物流状态
class PayDetailClass extends React.Component {
    render() {
        var pay_info = {};
        if(this.props.pay_info){
            pay_info = this.props.pay_info;
        }

      return (
        <div className="order_detail_pay_wrap">
            <div className="order_detail_pay_infor">
                <div>支付方式</div>
                <div>{pay_info.pay_way || ""}</div>
            </div>
            <div className="order_detail_pay_infor">
                <div>运费</div>
                <div>¥{this.props.items.logistics_price}</div>
            </div>
            <div className="order_detail_pay_infor">
                <div>支付金额</div>
                <div>{pay_info.pay_amount?"¥" + pay_info.pay_amount: ""}</div>
            </div>
            <div className="order_detail_pay_infor">
                <div>其他费用</div>
                <div>¥ 0.00</div>
            </div>
        </div>
      );
    }
};

// 订单x信息
class OrderDetailClass extends React.Component {
    render() {
      return (
          <div className="product-infor" data-id="00137208_C25" >
      	        <div className="all">
      	          <div className="product-infor-left">
      				<img src={this.props.products[this.props.product.product_id].img.location} alt=""/>
      			  </div>
      	          <div className="product-infor-middle">
      	            <p className="p1">{this.props.products[this.props.product.product_id].product_name}</p>
      	            <p className="p2">￥ {this.props.products[this.props.product.product_id].product_sale_price}</p>
      	          </div>
      	          <div className="product-infor-right">
      	            <p>x1</p>
      	          </div>
      	        </div>
      	      </div>
      );
    }
};
const ReduxIoIo = connect(mapStateToProps)(IoIo);
const OrderDetailAddress = connect(mapStateToProps)(OrderDetailAddressClass);
const PayDetail = connect(mapStateToProps)(PayDetailClass);
const OrderDetail = connect(mapStateToProps)(OrderDetailClass);

ReactDOM.render(
    <Provider store={store}>
        <ReduxIoIo/>
    </Provider>,
  document.getElementById("order_detail")
);
