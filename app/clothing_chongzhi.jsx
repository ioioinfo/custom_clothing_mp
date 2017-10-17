var React = require('react');
var ReactDOM = require('react-dom');

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
          <p>在线充值</p>
          <span className="chongzhi_head_back"><i className="fa fa-angle-left chongzhi_head_back_icon"></i></span>
          <span className="chongzhi_head_infor"><i className="fa fa-info-circle chongzhi_head_back_icon"></i></span>
        </div>
      );
    }
};

class ChongzhiMiddle extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
      this.handleClick1=this.handleClick1.bind(this);
      this.handleClick2=this.handleClick2.bind(this);
      this.handleClick3=this.handleClick3.bind(this);
    }
    componentDidMount() {
      $('.chongzhi_middle_choice_infor p:first-child').addClass('chongzhijine_style');
      var firstVal = $('#chongzhijine1').html();
    }
    handleClick(selected){
      $('.chongzhi_fangshi').hide();
      $('#chongzhi_fangshi'+selected).css("display","block");
    }
    handleClick1(selected1){
      $('.chongzhi_middle_choice_infor p').removeClass('chongzhijine_style');
      $('#chongzhijine'+selected1).addClass('chongzhijine_style');
    }
    handleClick2(){
        $('.tiaokuan').show();
    }
    handleClick3(){
        $('.tiaokuan').hide();
    }
    render() {
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
              <p id="chongzhijine1" onClick={this.handleClick1.bind(this,1)}>100 元</p>
              <p id="chongzhijine2" onClick={this.handleClick1.bind(this,2)}>200 元</p>
              <p id="chongzhijine3" onClick={this.handleClick1.bind(this,3)}>500 元</p>
              <p id="chongzhijine4" onClick={this.handleClick1.bind(this,4)}>1000 元</p>
              <p id="chongzhijine5" onClick={this.handleClick1.bind(this,5)}>2000 元</p>
              <p id="chongzhijine6" onClick={this.handleClick1.bind(this,6)}>5000 元</p>
            </div>
            <div className="chongzhi_middle_choice_jiesuan">实际到账<span>0.00</span></div>
          </div>

          <div className="chongzhi_middle_kind">
            <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.handleClick.bind(this,1)}>
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_zhifubao.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>支付宝</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi1"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </a>

            <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.handleClick.bind(this,2)}>
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_weixin.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>微信</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi2"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </a>

            <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.handleClick.bind(this,3)}>
              <div className="weui-cell__hd chongzhi_middle_kind_img_right">
                <img src="images/zhifu_yinhangka.png" alt="" className="chongzhi_middle_kind_img"/>
              </div>
              <div className="weui-cell__bd weui-cell_primary">
                <p>银行卡</p>
              </div>
              <span className="chongzhi_fangshi" id="chongzhi_fangshi3"><i className="fa fa-check-circle chongzhi_middle_kind_icon"></i></span>
            </a>
          </div>

          <div className="chongzhi_bottom">
            <p>点击去充值，即默认同意<span className="chongzhi_bottom_span" onClick={this.handleClick2}>《充值协议》</span></p>
            <a href="javascript:;" className="weui-btn weui-btn_primary">去充值</a>
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



ReactDOM.render(
  <IoIo/>,
  document.getElementById("chongzhi")
);
