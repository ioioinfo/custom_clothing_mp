var React = require('react');
var ReactDOM = require('react-dom');

// 框架
class Wrap extends React.Component{
  constructor(props){
    super(props);
    this.state = {vip_item:{},record_items:[]};
  }
  componentDidMount() {
    $.ajax({
           url: "/get_member_info",
           dataType: 'json',
           type: 'GET',
           data:{"card_id":card_id},
           success: function(data) {
             if (data.rows.length > 0) {
               this.setState({vip_item:data.rows[0]});
             }else {
               $('.ammount').html('暂无金额');
             }
           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
      });

      $.ajax({
             url: "/member_consume_history",
             dataType: 'json',
             type: 'GET',
             data:{"card_id":card_id},
             success: function(data) {
               var record_items = this.state.record_items;
                 for (var i = 0; i < data.cost.length; i++) {
                   var cost = data.cost[i];
                   cost.type = 1;
                   record_items.push(cost);
               };
               for (var i = 0; i < data.income.length; i++) {
                 var income = data.income[i];
                 income.type = 2;
                 record_items.push(income);
               }

                function compare(a,b) {
                  if (a.created_at < b.created_at){
                    return -1;
                  }
                  if (a.created_at > b.created_at) {
                    return 1;
                  }
                  return 0;
                }

                record_items.sort(compare);

               this.setState({record_items:record_items});
             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });
  }
  render(){
    var record_items = this.state.record_items;

    var list = [];

    record_items.map(function(item){
      var type = item.type;
      if(type == 1){
        list.push(<div className="weui-cells" key={item.id}>
            <div className="weui-cell">
                <div className="weui-cell__hd">+</div>
                <div className="weui-cell__bd record_name">
                    <p>消费</p>
                    <p className="record_time">{item.created_at}</p>
                </div>
                <div className="weui-cell__ft">- {item.jine}元</div>
            </div>
        </div>);
      } else {
        list.push(<div className="weui-cells" key={item.id}>
            <div className="weui-cell">
                <div className="weui-cell__hd">+</div>
                <div className="weui-cell__bd record_name">
                    <p>充值</p>
                    <p className="record_time">{item.created_at}</p>
                </div>
                <div className="weui-cell__ft">+ {item.jine}元</div>
            </div>
        </div>);
      }

    });


    return (
      <div className="record">
        <h3 className="record_title">充值记录</h3>
        <div className="page__hd">
            <h1 className="page__title ammount"><span className="money_style">￥</span> 100</h1>
            <p className="page__desc">余额</p>
        </div>
        <div className="record_list">
        {list}
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
