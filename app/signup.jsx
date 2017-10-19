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
      this.handleClick3 = this.handleClick3.bind(this);
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
      $.ajax({
         url: "/get_vertify",
         dataType: 'json',
         type: 'POST',
         data:{"phone":phone},
         success: function(data) {
           if (data.success) {
             time(60);
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

    }
    handleClick1(e){
        $('.tiaokuan').show();
    }
    handleClick2(e){
        $('.tiaokuan').hide();
    }
    handleClick3(e){
        var mobile = $('#phone').val();
        var password = $('#password').val();
        if (!mobile) {
            alert('请输入正确的验证码');
            return;
        }
        if (!password) {
            alert('请输入密码');
            return;
        }
        $.ajax({
           url: "/do_register",
           dataType: 'json',
           type: 'POST',
           data:{"username":mobile,"mobile":mobile,"password":password},
           success: function(data) {
             if (data.success) {
               location.href="login";
             }else {
                 var message = "user already exists";
                 alert('用户已存在');
             }
           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
        });
    }
    render() {
      return (
        <div className="signup_wrap">
          <div className="signup_top">
            <div className="page__hd signup_title_style">
              <h1 className="page__title" id="animation">欢迎来到私人订制</h1>
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
              <div className="weui-cell yanzhengma">
                  <div className="weui-cell__hd"><label className="weui-label">验证码</label></div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码" id="mobile"/>
                  </div>
              </div>
              <div className="weui-cell">
                  <div className="weui-cell__hd"><label className="weui-label">密码</label></div>
                  <div className="weui-cell__bd">
                      <input className="weui-input" placeholder="请输入密码" id="password"/>
                  </div>
              </div>

            </div>

            <label className="weui-agree agree_style">
              <input id="weuiAgree" type="checkbox" name="checkbox" className="weui-agree__checkbox"/>
              <span className="weui-agree__text" onClick={this.handleClick1}>
                  选择注册代表您已经同意<a href="#">《相关条款》</a>
              </span>
            </label>
          </div>

          <div className="signup_button">
            <a className="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" onClick={this.handleClick3}>注册</a>
          </div>

          <div className="tiaokuan">
            <span className="close" onClick={this.handleClick2}>关闭</span>
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
  document.getElementById("signup")
);
