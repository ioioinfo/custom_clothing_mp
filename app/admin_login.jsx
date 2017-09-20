var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      adminLogin();
    }

    render() {
      return (
        <div className="loding_wrap">
          <div id="logo">
              <img src="img/logo.png" alt="" />
          </div>
          <div id="loginbox">
              <form id="loginform" className="form-vertical" action="index.html">
                  <p>请输入用户名和密码</p>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-user"></i></span>
                              <input type="text" placeholder="用户名" />
                          </div>
                      </div>
                  </div>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-lock"></i></span>
                              <input type="password" placeholder="密码" />
                          </div>
                      </div>
                  </div>
                  <div className="form-actions">
                      <span className="pull-left"><a href="#" className="flip-link" id="to-recover">忘记密码?</a></span>
                      <span className="pull-right"><input type="submit" className="btn btn-inverse" value="登录" /></span>
                  </div>
              </form>
              <form id="recoverform" action="#" className="form-vertical">
                  <p>输入注册手机号</p>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-envelope"></i></span>
                              <input type="text" placeholder="手机号" />
                          </div>
                      </div>
                  </div>
                  <div className="form-actions">
                      <span className="pull-left"><a href="#" className="flip-link" id="to-login">&lt; 返回登陆</a></span>
                      <span className="pull-right"><input type="submit" className="btn btn-inverse" value="找回" /></span>
                  </div>
              </form>
          </div>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("admin_login")
);
