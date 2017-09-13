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
      time(60);
    }
    render() {
      return (
        <div className="signup_wrap">
          <div className="signup_top">
            <div className="page__hd signup_title_style">
              <h1 className="page__title" id="animation">欢迎来到私人订货</h1>
            </div>

            <div className="weui-cells">
              <div className="weui-cell weui-cell_access">
                  <div className="weui-cell__bd">
                      <p className="signup_word_style">注册</p>
                  </div>
                  <a className="weui-cell__ft account_style" href="login">有帐号？去登录</a>
              </div>
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
              <div className="weui-cell">
                  <div className="weui-cell__hd"><label className="weui-label">密码</label></div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" placeholder="请输入密码"/>
                  </div>
              </div>
              <div className="weui-cell yanzhengma">
                  <div className="weui-cell__hd"><label className="weui-label">验证码</label></div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码"/>
                  </div>
              </div>
            </div>

            <label className="weui-agree agree_style">
              <input id="weuiAgree" type="checkbox" name="checkbox" className="weui-agree__checkbox"/>
              <span className="weui-agree__text">
                  选择注册代表您已经同意<a href="#">《相关条款》</a>
              </span>
            </label>
          </div>

          <div className="signup_button">
            <a className="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">注册</a>
          </div>

        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("signup")
);
