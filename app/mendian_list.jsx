var React = require('react');
var ReactDOM = require('react-dom');

class Warp extends React.Component {
  render() {
      return (
        <div className="wrap">
            <div data-reactroot="" className="wrap">
                <div className="head">
                    <span className="title">门店信息</span>
                </div>
                <div className="middle">
                    <div className="news">
                        <a href="#">
                            <div clclassNameass="newsInfor">
                                <div className="newscontent">
                                    <p className="newsimg">
                                        <img src="images/biyou.jpg" alt="" />
                                    </p>
                                    <p className="newsword">
                                        <span>善淘网●石门二路慈善商店</span><span>上海市静安区新闸路1132号</span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="down">到底了</div>
            </div>
        </div>
      );
  }
};

ReactDOM.render(
  <Warp/>,
  document.getElementById("mendian_list")
);
