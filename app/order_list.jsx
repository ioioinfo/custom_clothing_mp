var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    render() {
      var style = {display:'none'};
      return (
        <div className="project_list_wrap">
          <Projectsearch/>
          <Projectlist/>
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
class Projectlist extends React.Component {
    constructor(props) {
      super(props);

    }
    render() {
      var style = {marginRight:'5px' ,display:'block'};
      return (
        <ul className="project_list_ul">
            <li>
              <div className="weui-cells">
                <div className="weui-cell font_style position_relative">
                    <div className="weui-cell__hd project_list_img_wrap"><img src="images/biyou.jpg"  alt="" style={style}/></div>
                    <div className="weui-cell__bd product_name">
                        <p className="product_name_infor">旗袍</p>
                        <p className="product_price"><span>￥</span>100</p>
                    </div>
                    <div className="weui-cell__ft position_absolute2"><span id='number'>1</span> 件</div>
                </div>
              </div>
            </li>

        </ul>
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


ReactDOM.render(
    <IoIo/>,
    document.getElementById("order_list")
);
