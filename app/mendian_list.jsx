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
      this.state={store_list:[]}
  }
  // 3
  componentDidMount() {
      $.ajax({
         url: "/get_store_list",
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
               this.setState({store_list:data.store_list});
           }else {

           }

         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
     });
  }
  // 1
  render() {
      return (
        <div className="middle">
            {this.state.store_list.map((item,index) => (
                <News item={item} key={index}/>
            ))
            }
        </div>
      );
  }
};
// 中间消息
class News extends React.Component {

  render() {
      var img = "images/no.jpg";
    return (
      <div className="news">
        <a href="#">
            <div className="newsInfor">
              <div className="newscontent">
                <p className="newsimg"><img src={img} alt="" /></p>
                <p className="newsword"><span>{this.props.item.points[0].point_name}</span>
                <span>{this.props.item.points[0].province+this.props.item.points[0].district+this.props.item.points[0].detail_address}</span></p>
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
