var React = require('react');
var ReactDOM = require('react-dom');

// 框架
class Wrap extends React.Component{
  constructor(props){
    super(props);
    this.state = {items:[]};
  }
  componentDidMount() {
      $.ajax({
             url: "/list_vip_amount_history",
             dataType: 'json',
             type: 'GET',
             success: function(data) {

               this.setState({items:data.rows});
             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });
  }
  render(){

    return (
      <div className="record">
        <div className="record_list">
            {this.state.items.map((item,index)=>(
                <List item={item} index={index}/>
            ))}

        </div>
      </div>
    );
  }
}

class List extends React.Component{

  render(){
      var pay_amount = this.props.item.pay_amount;
      var way = '消费';
      var style = {color:'green',fontSize:'22px'};
      if (pay_amount > 0) {
          pay_amount = "+ " +this.props.item.pay_amount;
          way = '充值';
          style = {color:'red',fontSize:'22px'};
      }
    return (
        <div className="weui-cells" key={this.props.index}>
            <div className="weui-cell">
                <div className="weui-cell__hd" style={style}>*</div>
                <div className="weui-cell__bd record_name">
                    <p>{way}</p>
                    <p className="record_time">{this.props.item.created_at_text}</p>
                </div>
                <div className="weui-cell__ft">{pay_amount}元</div>
            </div>
        </div>
    );
  }
}
// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
