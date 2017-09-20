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
          <Projectlist/>
          <ProjectButton/>
          <Top/>
          <Home/>
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
      this.handleDelect = this.handleDelect.bind(this);
      this.handleHide = this.handleHide.bind(this);
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

      $('.background').show();
      $('.project_money').show();
      $('.project_money').attr('id','animation');
    }
    handleBuy(e){
      var num = $('.position_absolute2 span').html();
      $('#number').val(num);
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
      $('.delect_order').hide();
      $('.project_money').hide();
    }
    handleHide(e){
      $('.background').hide();
      $('.delect_order').hide();
    }
    handleDelect(e){
      $('.delect_order').show();
      $('.background').show();
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
                    <div className="weui-cell__ft position_absolute" onClick={this.handleBuy}><i className="fa fa-pencil"></i></div>
                    <div className="weui-cell__ft position_absolute1" onClick={this.handleDelect}><i className="fa fa-trash-o"></i></div>
                    <div className="weui-cell__ft position_absolute2"><span>11</span> 件</div>
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

          <div className="delect_order">
            <p className="yes_or_no">是否确认删除该商品？</p>
            <p className="delect_order_button"><span className="no">删除</span><span className="yes" onClick={this.handleHide}>不删除</span></p>
          </div>

          <div className="project_money">
            <p>统计</p>
            <p>共计 ： 1000.00 元</p>
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
      if (topHeight>200){
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


class Home extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      $(window).scroll(function(){
        var topHeight=$(window).scrollTop();
        if (topHeight>100){
          //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
          $(".nav_home").fadeIn(250);
        }else{ //否则就消失
          $(".nav_home").fadeOut(250);
        }

      })
    }
    render() {
      return (
        <div className="nav_home"><a href="#"><i className="fa fa-home"></i></a></div>
      );
    }
};

ReactDOM.render(
  <IoIo/>,
  document.getElementById("product_cart")
);
