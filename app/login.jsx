var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.handleSubmit=this.handleSubmit.bind(this);
      this.state = {};
    }
    componentDidMount() {

    }
    handleSubmit(e){
      var data_email = $('#data_email').val();
      var data_password = $('#data_password').val();
      if(!data_email){
        $('#data_email').addClass('loding_border');
        $('.error_message').css('display','block');
        $('.error_message').attr('id','animation1');
        return;
      }else if (!data_password) {

        $('#data_email').removeClass('loding_border');
        $('.error_message').css('display','none');
        $('.error_message').removeAttr('id','animation1');


        $('#data_password').addClass('loding_border');
        $('.error_message1').css('display','block');
        $('.error_message1').attr('id','animation1');
        return;
      }

      if ($('#loadingToast').css('display') != 'none') return;
          $('#loadingToast').fadeIn(100);
          setTimeout(function () {
              $('#loadingToast').fadeOut(100);
          }, 2000);

          $('#data_password').removeClass('loding_border');
          $('.error_message1').css('display','none');
          $('.error_message1').removeAttr('id','animation1');
      }

    render() {
      var style = {display:'none'};
      return (
        <div className="loding_wrap">
          <div className="loding_com_namewrap" id="animation">
            <div className="loding_com_name">
              <span>佑佑科技</span>
            </div>
          </div>

          <div className="loding_middle">
            <div className="loding_middle_next">
              <div className="login-form-title">
                <span className="login-form-project">私人订货</span>
              </div>

              <div className="loding_middle_email_wrap">
                <input className="loding_middle_email_input" placeholder="手机号" type="email" name="data[email]" id="data_email" />
                <label className="loding_middle_email_name"></label>
                <span className="error_message">请重新输入用户名<i className="ico error-buble"></i></span>
              </div>

              <div className="loding_middle_password_wrap">
                <input className="loding_middle_password_input" placeholder="Password" type="密码" name="data[password]" id="data_password" />
                <label className="loding_middle_password_name"></label>
                <span className="error_message1">请重新输入密码<i className="ico error-buble"></i></span>
              </div>

              <input type="submit" name="commit" value="登 录" className="loding_middle_submit" onClick={this.handleSubmit} />
            </div>
          </div>

          <div id="loadingToast" style={style}>
              <div className="weui-mask_transparent"></div>
              <div className="weui-toast">
                  <i className="weui-loading weui-icon_toast"></i>
                  <p className="weui-toast__content">登录加载中</p>
              </div>
          </div>

          <p className="login_bottom"><a href="signup">注册</a>|<a>忘记密码？</a></p>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("loding")
);
