var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


function product(state, action) {
  switch (action.type) {
  case 'CHONGZHI_FANLI':
    {
        var activity_id = action.activity_id;
      $.ajax({
         url: "/get_recharge_campaign?activity_id="+activity_id,
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
             store.dispatch({ type: 'GET_DATA', data: data,activity_id:activity_id});
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
    var activity_id = action.activity_id;
    return {chongzhi_list:data.rates,activity_id:activity_id};
  }
  case 'BUILD_ORDER':
    {
        var activity_id = state.activity_id;
        var marketing_price = action.marketing_price;
        $.ajax({
            url: "/add_member_order",
            dataType: 'json',
            type: 'POST',
            data:{'pay_way':pay_way,'activity_id':activity_id,'marketing_price':marketing_price,'actual_price':actual_price},
            success: function(data) {
                if (data.success) {
                    if(pay_way=="weinxin_pay"){
                        var row = data.row;

                        wx.chooseWXPay({
                            timestamp: row.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: row.nonce_str, // 支付签名随机串，不长于 32 位
                            package: 'prepay_id='+row.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: row.sign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                alert("支付成功");
                            }
                        });
                    } else {

                    }
                }else {
                    alert(data.message);
                }
            }.bind(this),
                error: function(xhr, status, err) {
            }.bind(this)
        });

      return state;
    }

  default:
    return state
  }
}

let store = createStore(product,{chongzhi_list:[],activity_id:"",marketing_price:""});

const mapStateToProps = (state) => {
    return {
        chongzhi_list: state.chongzhi_list,
        activity_id: state.activity_id,
    }
}


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {

    }

    render() {
      var style = {display:'none'};
      return (
        <div className="chongzhi_wrap">
          <ChongzhiHead/>
          <ChongzhiMiddle/>
        </div>
      );
    }
};

class ChongzhiHead extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {

    }
    render() {
      var style = {display:'none'};
      return (
        <div className="chongzhi_head">
          <p className="padding">在线充值</p>
          <span className="chongzhi_head_infor"><i className="fa fa-info-circle chongzhi_head_back_icon"></i></span>
        </div>
      );
    }
};

class ChongzhiMiddleClass extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
      this.handleClick1=this.handleClick1.bind(this);
      this.handleClick2=this.handleClick2.bind(this);
      this.handleClick3=this.handleClick3.bind(this);
      this.handleClick4=this.handleClick4.bind(this);
    }
    componentDidMount() {
      store.dispatch({ type: 'CHONGZHI_FANLI',activity_id:'rc001'});
    }
    handleClick(selected,pay_way1){
      $('.chongzhi_fangshi').hide();
      $('#chongzhi_fangshi'+selected).css("display","block");
      pay_way = pay_way1;
    }
    handleClick1(selected1,price){
      $('.chongzhi_middle_choice_infor p').removeClass('chongzhijine_style');
      $('#chongzhijine'+selected1).addClass('chongzhijine_style');
      $('#price').html(price);
      actual_price = price;
    }
    handleClick2(e){
        $('.tiaokuan').show();
    }
    handleClick3(e){
        $('.tiaokuan').hide();
    }
    handleClick4(e){
        var marketing_price = $('#price').html();
        if (pay_way == "") {
            alert('请选择微信支付');
            return;
        }
        store.dispatch({ type: 'BUILD_ORDER',activity_id:'rc001',marketing_price:marketing_price});
    }
    render() {
        var first = "0.00";
        if (this.props.chongzhi_list.length > 0) {
            first = this.props.chongzhi_list[0].price;
            actual_price = this.props.chongzhi_list[0].price1;
        }
       var style = {display:'none'};
       return (
        <div className="chongzhi_middle">
          <div className="chongzhi_middle_account">
            <div className="chongzhi_middle_account_left chongzhi_middle_account_infor">
              <p className="chongzhi_middle_account_number">总金额：<br/><span>3000.00</span></p>
            </div>
            <div className="chongzhi_middle_account_right chongzhi_middle_account_infor">
              <p className="chongzhi_middle_account_right_money">
                <span className="chongzhi_middle_account_right_money_dian1"></span>本金
                <span className="chongzhi_middle_account_right_money_number">0.00</span>
              </p>

              <p className="chongzhi_middle_account_right_money">
                <span className="chongzhi_middle_account_right_money_dian2"></span>增额
                <span className="chongzhi_middle_account_right_money_number">0.00</span>
              </p>
            </div>
          </div>

          <div className="chongzhi_middle_choice">
            <div className="chongzhi_middle_choice_title">选择充值金额</div>
            <div className="chongzhi_middle_choice_infor">
              {this.props.chongzhi_list.map((item,index)=>(
                  <p className={0 == index? "chongzhijine_style":""} key={index} id={"chongzhijine"+(index +1)} onClick={this.handleClick1.bind(this,index+1,item.price)}>{item.price1} 元</p>
              ))}
            </div>
            <div className="chongzhi_middle_choice_jiesuan">实际到账<span id="price">{first}</span>元</div>
          </div>

          <div className="chongzhi_middle_kind">
            <a className="weui-cell weui-cell_access" href="javascript:;">
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_zhifubao.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>支付宝(暂未开通)</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi1"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </a>

            <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.handleClick.bind(this,2,'weinxin_pay')}>
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_weixin.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>微信</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi2"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </a>

            <span className="weui-cell weui-cell_access">
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_yinhangka.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>银行卡(暂未开通)</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi3"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </span>
          </div>

          <div className="chongzhi_bottom">
            <p>点击去充值，即默认同意<span className="chongzhi_bottom_span" onClick={this.handleClick2}>《充值协议》</span></p>
            <span className="weui-btn weui-btn_primary" onClick={this.handleClick4}>去充值</span>
          </div>

          <div className="tiaokuan">
            <span className="close"  onClick={this.handleClick3}>关闭</span>
            <h3 className="tiaokuan_title">条款</h3>
            <div className="tiaokuan_infor">
                条款正文
            </div>
          </div>
        </div>
      );
    }
};

const ChongzhiMiddle = connect(mapStateToProps)(ChongzhiMiddleClass);

ReactDOM.render(
    <Provider store={store}>
        <IoIo/>
    </Provider>,
  document.getElementById("chongzhi")
);
