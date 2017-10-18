var React = require('react');
var ReactDOM = require('react-dom');

class Warp extends React.Component {
  render() {
      return (
        <div className="wrap">
            <div className="wrap_title">公司简介</div>
            <Infor/>
        </div>
      );
  }
};

class Infor extends React.Component {
  render() {
      return (
          <div class="infor">具体内容</div>
      );
  }
};
ReactDOM.render(
  <Warp/>,
  document.getElementById("company")
);
