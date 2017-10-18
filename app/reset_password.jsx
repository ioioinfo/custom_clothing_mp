var React = require('react');
var ReactDOM = require('react-dom');
var time;
function time(num){
   var t =setInterval( function(){
     num--;
     $(".timenum").html(Math.ceil(num));
     if(num<=0){
       clearInterval(t);
       $(".timenum").html('获取验证码');
     }
   },1000);
}

class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleClick1 = this.handleClick1.bind(this);
      this.handleClick2 = this.handleClick2.bind(this);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      $('#phone').focus();
      $("[name='checkbox']").prop("checked",true);
      var windowHeight = $(window).height();
      var signupTopHeight = $('.signup_top').height();
      var marginHeight = windowHeight - signupTopHeight - 46;
      $('.signup_button').css('margin-top',marginHeight);
    }
    handleClick(e){
      var  phone = $('#phone').val();
      var  isPhone = /^1(3|4|5|7|8)\d{9}$/;
      if (!isPhone.test(phone)) {
          alert('请输入正确的手机号');
          return;
      }
      time(60);
    }
    handleClick1(){
        $('.tiaokuan').show();
    }
    handleClick2(){
        $('.tiaokuan').hide();
    }
    render() {
      return (
        <div className="signup_wrap">
          <div className="signup_top">
            <div className="page__hd signup_title_style">
              <h1 className="page__title" id="animation">找回密码</h1>
            </div>

            <div className="weui-cells weui-cells_form">

              <div className="weui-cell weui-cell_vcode">
                  <div className="weui-cell__hd">
                      <label className="weui-label">手机号</label>
                  </div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" type="tel" placeholder="请输入手机号" id="phone"/>
                  </div>
                  <div className="weui-cell__ft">
                      <button className="weui-vcode-btn  timenum" onClick={this.handleClick}>获取验证码</button>
                  </div>
              </div>

              <div className="weui-cell yanzhengma">
                  <div className="weui-cell__hd"><label className="weui-label">验证码</label></div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码"/>
                  </div>
              </div>

              <div className="weui-cell">
                  <div className="weui-cell__hd"><label className="weui-label">新密码</label></div>
                  <div className="weui-cell__bd">
                      <input type="text" className="weui-input" placeholder="请输入新密码"/>
                  </div>
              </div>

            </div>
          </div>

          <div className="signup_button">
            <a className="weui-btn weui-btn_primary" href="login" id="showTooltips">下一步</a>
          </div>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("reset_password")
);
