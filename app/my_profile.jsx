var React = require('react');
var ReactDOM = require('react-dom');

// 框架
class Wrap extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
  }
  render(){
    return (
        <div className="my_profile_wrap">
            <h3>我的资料</h3>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">身高：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">体重：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">胸围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">腰围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">臀围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">肩宽：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">胸围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">胸围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">胸围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="my_profile_infor_type">
                <span className="my_profile_title">胸围：</span>
                <input className="my_profile_input" type="text" name="xiongwei"/>
            </div>
            <div className="button">
                <button className="button_xiugai">修改</button>
                <button className="button_baocun">保存</button>
            </div>
        </div>
    );
  }
}
// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("my_profile")
);
