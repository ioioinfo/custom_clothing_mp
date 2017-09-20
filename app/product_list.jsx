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
          <Projectsearch/>
          <Projectlist/>
          <ProjectButton/>
          <Top/>
        </div>
      );
    }
};

class Projectsearch extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="page__bd project_list_search">
            <div className="weui-search-bar" id="searchBar">
                <form className="weui-search-bar__form">
                    <div className="weui-search-bar__box">
                        <i className="weui-icon-search"></i>
                        <input type="search" className="weui-search-bar__input" id="searchInput" placeholder="搜索" required=""/>
                    </div>
                </form>
                <a href="javascript:" className="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            </div>
        </div>
      );
    }
};
class Projectlist extends React.Component {
    constructor(props) {
      super(props);
      this.handleMinus = this.handleMinus.bind(this);
      this.handlePlus = this.handlePlus.bind(this);
      this.handleSure = this.handleSure.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleBuy = this.handleBuy.bind(this);
      // 初始化一个空对象
      this.state = {project_list:[],number:1};
    }
    componentDidMount() {
      var list = [{img:'images/img1.jpg' ,name:'这个名字够不够长你说，不够长我还可以加，加到你满意为止' ,price:'100.00'},
                  {img:'images/img2.jpg' ,name:'来一个短一点的' ,price:'100.00'},
                  {img:'images/img3.jpg' ,name:'汉堡' ,price:'999.00'},
                  {img:'images/img4.jpg' ,name:'猪肉' ,price:'888.00'},
                  {img:'images/img5.jpg' ,name:'葡萄' ,price:'777.00'},
                  {img:'images/img6.jpg' ,name:'连衣裙' ,price:'666.00'}];
      this.setState({project_list:list});
      var number = this.state.number;
      var num = $('#number').val();
      $('#number').val(num);
      this.setState({number:num});
    }
    handleBuy(e){
      $('.background').show();
      $('.projecrt_number').show();
    }
    handleMinus(e){
      var number = this.state.number;
      var num = $('#number').val();
      if(num>1){
        num--;
        $('#number').val(num);
        this.setState({number:num});
      }else {
        $('#number').val('1');
        this.setState({number:1});
      }
    }
    handlePlus(e){
      var number = this.state.number;
      var num = $('#number').val();
        num++;
        $('#number').val(num);
        this.setState({number:num});
    }

    handleSure(e){
      $('.background').hide();
      $('.projecrt_number').hide();
    }
    handleBack(e){
      $('.background').hide();
      $('.projecrt_number').hide();

  }
    render() {
      var style = {marginRight:'5px' ,display:'block'};
      return (
        <ul className="project_list_ul">
          {this.state.project_list.map((item,index) => (
            <li key={index}>
              <div className="weui-cells">
                <div className="weui-cell font_style position_relative">
                    <div className="weui-cell__hd project_list_img_wrap"><img src={item.img} alt="" style={style}/></div>
                    <div className="weui-cell__bd product_name">
                        <p className="product_name_infor">{item.name}</p>
                        <p className="product_price"><span>￥</span>{item.price}</p>
                    </div>
                    <div className="weui-cell__ft position_absolute" onClick={this.handleBuy}><i className="fa fa-shopping-basket"></i></div>
                </div>
              </div>
            </li>

            ))
          }
          <div className="background" onClick={this.handleBack}></div>
          <div className="projecrt_number">
            <div className="projecrt_number_in">
              <p onClick={this.handleMinus}><i className="fa fa-minus"></i></p>
              <p><span className="input_out"><input type="number" placeholder="1" id="number"/></span></p>
              <p onClick={this.handlePlus}><i className="fa fa-plus"></i></p>
              <button className="sure" onClick={this.handleSure}>确定</button>
            </div>
          </div>

        </ul>
      );
    }
};


class ProjectButton extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_list_button">
          <p>去提交</p>
        </div>
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
  document.getElementById("product_list")
);
