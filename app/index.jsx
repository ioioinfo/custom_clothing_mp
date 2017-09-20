var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');
// 框架
class Wrap extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
        <div className="product_home">
          <Lunbo items={items} rate={rate}/>
          <ProductNav/>
        </div>
    );
  }
};

// 菜单
class ProductNav extends React.Component {
  constructor(props) {
    super(props);
    this.state={qipao:[]};

  }
  componentDidMount() {
    // var product_nav_list_width = $('.product_nav_list').width();
    // $('.product_nav_list').css('height',product_nav_list_width/2);
    var list = [{img:'img/qipao_1.jpg', price:'399.00'},{img:'img/qipao_2.jpg', price:'399.00'},
                {img:'img/qipao_3.jpg', price:'399.00'},{img:'img/qipao_4.jpg', price:'399.00'},
                {img:'img/qipao_5.jpg', price:'399.00'},{img:'img/qipao_6.jpg', price:'399.00'},
                {img:'img/qipao_7.jpg', price:'399.00'},{img:'img/qipao_8.jpg', price:'399.00'}];
                this.setState({qipao:list});
  }
  render() {
    return (
        <div className="product_nav">
          <div className="product_nav_list">
            <h1 className="qipao_title">「旗 袍」</h1>
            <ul className="qipao_wrap">
              {this.state.qipao.map((item,index) => (
                <li key={index}>
                  <img src={item.img}/>
                  <p className="qipao_price">
                    <span className="pull-left price_style">￥{item.price}</span>
                    <span className="pull-right buy_style">立即定制</span>
                  </p>
                </li>
                ))
              }

            </ul>
            <div className="chuiniubi">珍藏</div>
            <div className="qipao_ad"><img src="img/qipao_9.jpg"/></div>
          </div>

          <div className="product_nav_list">
            <h1 className="qipao_title">「旗 袍」</h1>
            <ul className="qipao_wrap">
              {this.state.qipao.map((item,index) => (
                <li key={index}>
                  <img src={item.img}/>
                  <p className="qipao_price">
                    <span className="pull-left price_style">￥{item.price}</span>
                    <span className="pull-right buy_style">立即定制</span>
                  </p>
                </li>
                ))
              }

            </ul>
            <div className="chuiniubi">珍藏</div>
            <div className="qipao_ad"><img src="img/qipao_9.jpg"/></div>
          </div>
        </div>
    );
  }
};

// 返回到页面
ReactDOM.render(
  <Wrap/>,
  document.getElementById("product")
);
