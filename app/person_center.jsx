var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
    }
    componentDidMount() {

    }

    render() {
      return (
        <div className="person_center">
          <div className="person_center_head">
            <span className="person_center_head_img"><img src="images/biyou.jpg"/></span>
            <p className="person_center_head_name">BiYou</p>
            <span className="person_infor">我的资料</span>
          </div>
          <div className="person_center_number">
            <div className="person_center_number_left pull-left">
              <p className="person_center_number_infor">0<span>元</span></p>
              <p>余额</p>
            </div>
            <div className="person_center_number_right pull-right">
              <p className="person_center_number_infor">0<span>件</span></p>
              <p>已购</p>
            </div>
          </div>

          <PersonCenterMiddle/>
        </div>
      );
    }
};


class PersonCenterMiddle extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
    }
    componentDidMount() {

    }

    render() {
      var style = {color:'#fff',marginRight:'5px',display:'block',padding:'3px 6px' };
      return (
        <div className="weui-cells">
            <a className="weui-cell weui-cell_access" href="javascript:;">
                <div className="weui-cell__hd"><span style={style} className="icon_style1"><i className="fa fa-camera-retro"></i></span></div>
                <div className="weui-cell__bd">
                    <p>暂定菜单一</p>
                </div>
                <div className="weui-cell__ft">说明文字</div>
            </a>
            <a className="weui-cell weui-cell_access" href="javascript:;">
                <div className="weui-cell__hd"><span style={style} className="icon_style2"><i className="fa fa-balance-scale"></i></span></div>
                <div className="weui-cell__bd">
                    <p>暂定菜单二</p>
                </div>
                <div className="weui-cell__ft"></div>
            </a>
            <a className="weui-cell weui-cell_access" href="javascript:;">
                <div className="weui-cell__hd"><span style={style} className="icon_style3"><i className="fa fa-camera-retro"></i></span></div>
                <div className="weui-cell__bd">
                    <p>暂定菜单三</p>
                </div>
                <div className="weui-cell__ft"></div>
            </a>
            <a className="weui-cell weui-cell_access" href="javascript:;">
                <div className="weui-cell__hd"><span style={style} className="icon_style4"><i className="fa fa-balance-scale"></i></span></div>
                <div className="weui-cell__bd">
                    <p>暂定菜单四</p>
                </div>
                <div className="weui-cell__ft"></div>
            </a>
        </div>

      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("loding")
);