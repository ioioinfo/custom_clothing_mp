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
        var verify = $('#verify').val();
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
           data:{"verify":verify,"mobile":mobile,"password":password},
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
                      <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码" id="verify"/>
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
            尊敬的客户，欢迎您注册成为本网站用户。在注册前请您仔细阅读如下服务条款：<br/>
                &nbsp;&nbsp;&nbsp;本服务协议双方为本网站与本网站客户，本服务协议具有合同效力。您确认本服务协议后，本服务协议即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，
                如有任何疑问，可向本网站咨询。 无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击协议正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示
                您同意并签署了本服务协议。
                协议细则<br/>
                1、本网站服务条款的确认和接纳<br/>
                本网站各项服务的所有权和运作权归本网站拥有。<br/>
                2、用户必须：<br/>
                (1)自行配备上网的所需设备， 包括个人电脑、调制解调器或其他必备上网装置。<br/>
                (2)自行负担个人上网所支付的与此服务有关的电话费用、 网络费用。<br/>
                3、用户在本网站交易平台上不得发布下列违法信息：<br/>
                (1)反对宪法所确定的基本原则的；<br/>
                (2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br/>
                (3)损害国家荣誉和利益的；<br/>
                (4)煽动民族仇恨、民族歧视，破坏民族团结的；<br/>
                (5)破坏国家宗教政策，宣扬邪教和封建迷信的；<br/>
                (6)散布谣言，扰乱社会秩序，破坏社会稳定的；<br/>
                (7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br/>
                (8)侮辱或者诽谤他人，侵害他人合法权益的；<br/>
                (9)含有法律、行政法规禁止的其他内容的。<br/>
                4、有关个人资料<br/>
                用户同意：<br/>
                (1) 提供及时、详尽及准确的个人资料。<br/>
                (2).同意接收来自本网站的信息。<br/>
                (3) 不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。<br/>
                5、电子邮件<br/>
                用户在注册时应当选择稳定性及安全性相对较好的电子邮箱，并且同意接受并阅读本网站发往用户的各类电子邮件。如用户未及时从自己的电子邮箱接受电子邮件或因用户电子邮箱或用户
                电子邮件接收及阅读程序本身的问题使电子邮件无法正常接收或阅读的，只要本网站成功发送了电子邮件，应当视为用户已经接收到相关的电子邮件。电子邮件在发信服务器上所记录的
                发出时间视为送达时间。<br/>
                6、服务条款的修改<br/>
                本网站有权在必要时修改服务条款，本网站服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。
                如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。<br/>
                7、用户的帐号、密码和安全性<br/>
                你一旦注册成功成为用户，你将得到一个密码和帐号。如果你不保管好自己的帐号和密码安全，将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。你可随时根据指示改变你的
                密码，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，请立即通知本网站。<br/>
                8、拒绝提供担保<br/>
                用户明确同意信息服务的使用由用户个人承担风险。本网站不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。<br/>
                9、有限责任<br/>
                本网站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站形象受损，所以本网站
                事先提出这种损害的可能性，同时会尽量避免这种损害的发生。<br/>
                10、信息的储存及限制<br/>
                本网站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其服务的帐号。<br/>
                11、用户管理<br/>
                用户必须遵循：<br/>
                (1) 使用信息服务不作非法用途。<br/>
                (2) 不干扰或混乱网络服务。<br/>
                (3) 遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。<br/>
                12、保障<br/>
                用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、帐号和其它知识产权的追索费。<br/>
                13、结束服务<br/>
                用户或本网站可随时根据实际情况中断一项或多项服务。本网站不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站服务不满，
                用户可以行使如下权利：<br/>
                (1) 不再使用本网站信息服务。<br/>
                (2) 通知本网站停止对该用户的服务。<br/>
                结束用户服务后，用户使用本网站服务的权利马上中止。从那时起，用户没有权利，本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。<br/>
                14、通告<br/>
                所有发给用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。<br/>
                15、信息内容的所有权<br/>
                本网站定义的信息内容包括：文字、软件、声音、相片、录象、图表；在广告中全部内容；本网站为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，
                用户只能在本网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。<br/>
                16、法律<br/>
                本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。<br/>
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
