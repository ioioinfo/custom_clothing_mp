var React = require('react');
var ReactDOM = require('react-dom');

class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_list_wrap">
          <img src="images/right.png" />
          <p>下单成功，点击跳转至 <a href="#">订单详情</a></p>
          <p className="go_back_home"><a href="#">返回首页</a></p>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("order_sure")
);
