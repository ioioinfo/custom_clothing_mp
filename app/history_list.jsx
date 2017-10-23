var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


function product(state, action) {
  switch (action.type) {
  case 'ORDER_LIST':
    {
      $.ajax({
         url: "/order_center_data",
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
             store.dispatch({ type: 'GET_DATA', data: data});
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

      return state;
    }
  case 'GET_DATA':
  {
    var data = action.data;
    return {items:data.orders,products:data.products,details:data.details};
  }

  default:
    return state
  }
}

let store = createStore(product,{items:[],details:{},products:{}});

const mapStateToProps = (state) => {
    return {
        items: state.items,
        products: state.products,
        details: state.details,

    }
}


class IoIo extends React.Component {
    componentDidMount() {
        store.dispatch({ type: 'ORDER_LIST'});

    }
    render() {
        var items = (<div className="no_order_list">没有订单</div>);
        if (this.props.items.length>0) {
            items = (<div className="project_list_top">
              {this.props.items.map((item,index)=>(
                  <Projectlist item={item} index={index}/>
              ))}

            </div>);
        }

      var style = {display:'none'};
      return (
        <div className="project_list_wrap">
          <Projectsearch/>
          {items}
          <Top/>
        </div>
      );
    }
};

class Projectsearch extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="page__bd project_list_search">
            <div className="weui-search-bar" id="searchBar">
                <form className="weui-search-bar__form">
                    <div className="weui-search-bar__box">
                        <i className="weui-icon-search"></i>
                        <input type="search" className="weui-search-bar__input" id="searchInput" required=""/>
                    </div>
                </form>
                <a className="weui-search-bar__cancel-btn" id="searchCancel">搜索</a>
            </div>
        </div>
      );
    }
};
class ProjectlistClass extends React.Component {
    constructor(props) {
      super(props);

    }
    render() {
      var style = {marginRight:'5px' ,display:'block'};
      var details = [];
      if (this.props.details[this.props.item.order_id]) {
          details = this.props.details[this.props.item.order_id];
      }
      var order_id = this.props.item.order_id;
      return (
        <a href={"order_detail?order_id="+order_id}>
            <ul className="project_list_ul">
                <div className="order_time"><p>{this.props.item.created_at}</p><p className="red">{this.props.item.order_status}</p></div>
                {details.map((item,index)=>(
                    <ProjectlistList  item={item} index={index}/>
                ))}
            </ul>
        </a>
      );
    }
};

class ProjectlistListClass extends React.Component {
    render() {
      var style = {marginRight:'5px' ,display:'block'};
      var img = 'images/no.jpg';
        if (this.props.products[this.props.item.product_id].img) {
            img = this.props.products[this.props.item.product_id].img.location;
        }
      return (
          <li>
            <div className="weui-cells">
              <div className="weui-cell font_style position_relative">
                  <div className="weui-cell__hd project_list_img_wrap"><img src={img}  alt="" style={style}/></div>
                  <div className="weui-cell__bd product_name">
                      <p className="product_name_infor">{this.props.products[this.props.item.product_id].product_name}</p>
                      <p className="product_price"><span>￥</span>{this.props.products[this.props.item.product_id].product_sale_price}</p>
                  </div>
                  <div className="weui-cell__ft position_absolute2"><span id='number'>{this.props.products[this.props.item.product_id].is_sale}</span> 件</div>
              </div>
            </div>
          </li>
      );
    }
};

// 返回顶部
class Top extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
  }
  // 点击返回顶部
  handleClick(e){
     $('body,html').animate({scrollTop:0},400);
  }
  // 页面发生变化的时候触发
  componentDidMount() {
    $(window).scroll(function(){
      var topHeight=$(window).scrollTop();
      if (topHeight>100){
        //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
        $(".top").fadeIn(250);
      }else{ //否则就消失
        $(".top").fadeOut(250);
      }

    })
  }


  render() {
    var topHeight=$(window).scrollTop();

      return (
        <div className="top" onClick={this.handleClick}><img src="images/scroll-to-top-icon.png" alt="" /></div>
      );
  }
};

const ReduxIoIo = connect(mapStateToProps)(IoIo);
const Projectlist = connect(mapStateToProps)(ProjectlistClass);
const ProjectlistList = connect(mapStateToProps)(ProjectlistListClass);
ReactDOM.render(
    <Provider store={store}>
        <ReduxIoIo/>
    </Provider>,
    document.getElementById("history_list")
);
