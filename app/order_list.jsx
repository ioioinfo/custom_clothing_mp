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
      var style = {width:'20px' , marginRight:'5px' , display:'block'};
      var style1 = {textAlign:'center' , fontSize:'12px' , color:'#666' , marginTop:'27px' , marginBottom:'17px'};
      return (
        <div>
          <div className="page__hd">
            <h1 className="page__title">订单</h1>
            <p className="page__desc">列表</p>
          </div>

          <div className="weui-cells">
            <a className="weui-cell weui-cell_access" href="#">
                <div className="weui-cell__bd">
                    <p>2017-9-14</p>
                </div>
                <div className="weui-cell__ft">3000.00 元</div>
            </a>
            <a className="weui-cell weui-cell_access" href="#">
                <div className="weui-cell__bd">
                    <p>2017-9-13</p>
                </div>
                <div className="weui-cell__ft">40040.00 元</div>
            </a>
            <a className="weui-cell weui-cell_access" href="#">
                <div className="weui-cell__bd">
                    <p>2017-9-12</p>
                </div>
                <div className="weui-cell__ft">40040.00 元</div>
            </a>
            <a className="weui-cell weui-cell_access" href="#">
                <div className="weui-cell__bd">
                    <p>2017-9-11</p>
                </div>
                <div className="weui-cell__ft">40040.00 元</div>
            </a>
            <a className="weui-cell weui-cell_access" href="#">
                <div className="weui-cell__bd">
                    <p>2017-9-10</p>
                </div>
                <div className="weui-cell__ft">40040.00 元</div>
            </a>

          </div>
          <p style = {style1}>没有更多了 &nbsp;&nbsp;&nbsp;<a href="#">点此返回首页</a></p>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("order_list")
);
