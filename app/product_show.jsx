var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');
class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.handleMinus = this.handleMinus.bind(this);
      this.handlePlus = this.handlePlus.bind(this);
      this.handleSure = this.handleSure.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleBuy = this.handleBuy.bind(this);
      var items = [
          {id:1,img:'images/img1.jpg',href:'#'}
          ,{id:2,img:'images/img2.jpg',href:'#'}
          ,{id:3,img:'images/img3.jpg',href:'#'}
          ];
      this.state={items:items};
    }
    componentDidMount() {
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
      return (
        <div className="project_show_wrap">
          < Lunbo items={this.state.items}/>
          <div className="product_infor">
            <div className="product_infor_in">
              <p className="product_name">正宗牛头岭黑毛猪</p>
              <p className="product_price"><span>￥</span> 399.99</p>
            </div>
          </div>

          <div className="product_remind">
            <p><span>产地：</span>中国香港</p>
            <p><span>保质期：</span>三年</p>
            <p><span>规格：</span>500 g</p>
            <p><span>存储温度：</span>2～6℃</p>
          </div>
          <div className="project_infor_img">
            <img src="images/product_infor.jpg" />
          </div>
          <div className="project_list_button">
            <p onClick={this.handleBuy}>下单</p>
          </div>


          <div className="background" onClick={this.handleBack}></div>
          <div className="projecrt_number">
            <div className="projecrt_number_in">
              <p onClick={this.handleMinus}><i className="fa fa-minus"></i></p>
              <p><span className="input_out"><input type="number" placeholder="1" id="number"/></span></p>
              <p onClick={this.handlePlus}><i className="fa fa-plus"></i></p>
              <button className="sure" onClick={this.handleSure}>确定</button>
            </div>
          </div>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("product_show")
);
