var React = require('react');
var ReactDOM = require('react-dom');

class Warp extends React.Component {
  render() {
      return (
        <div className="wrap">
          <Header/>
          <Middle/>
          <div className="down">到底了</div>
        </div>
      );
  }
};
// 头部
class Header extends React.Component {
  render() {
      return (
          <div className="head">
            <span className="title">门店信息</span>
          </div>
      );
  }
};
// 中间部分
class Middle extends React.Component {
  // 2
  constructor(props) {
      super(props);
  }
  // 3
  componentDidMount() {
  }
  // 1
  render() {
      return (
        <div className="middle">
            <News/>
            <News/>
            <News/>
            <News/>
        </div>
      );
  }
};
// 中间消息
class News extends React.Component {
  render() {
    return (
      <div className="news">
        <a href="#">
            <div className="newsInfor">
              <div className="newscontent">
                <p className="newsimg"><img src="images/biyou.jpg" alt="" /></p>
                <p className="newsword"><span>善淘网●石门二路慈善商店</span>
                <span>上海市静安区新闸路1132号</span></p>
              </div>
            </div>
         </a>
      </div>
    );
  }
};

ReactDOM.render(
  <Warp/>,
  document.getElementById("mendian_list")
);
