var React = require('react');
var ReactDOM = require('react-dom');
var selected = '04';

    // 框架
    class Wrap extends React.Component {
      render() {
          return (
            <div className="HomePage_wrap">
            <Head/>
            <Nav/>
            <Infor/>
            </div>
          );
      }
    };
    class Head extends React.Component {
      render() {
          return (
            <div>
              <div id="header">
          			<h1><a href="#">在线订货后台</a></h1>
          		</div>

          		<div id="search">
          			<input type="text" placeholder="搜索..."/>
                <button type="submit" className="tip-right" title="Search">
                  <i className="icon-search icon-white"></i>
                </button>
          		</div>
          		<div id="user-nav" className="navbar navbar-inverse">
                  <ul className="nav btn-group">
                      <li className="btn btn-inverse" >
                        <a title="" href="#">
                          <i className="icon icon-user"></i>
                          <span className="text">Profile</span>
                        </a>
                      </li>
                      <li className="btn btn-inverse dropdown" id="menu-messages">
                        <a href="#" data-toggle="dropdown" data-target="#menu-messages" className="dropdown-toggle">
                          <i className="icon icon-envelope"></i>
                          <span className="text">Messages</span>
                          <span className="label label-important">5</span>
                          <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="sAdd" title="" href="#">new message</a></li>
                            <li><a className="sInbox" title="" href="#">inbox</a></li>
                            <li><a className="sOutbox" title="" href="#">outbox</a></li>
                            <li><a className="sTrash" title="" href="#">trash</a></li>
                        </ul>
                      </li>
                      <li className="btn btn-inverse"><a title="" href="#">
                        <i className="icon icon-cog"></i> <span className="text">Settings</span></a>
                      </li>
                      <li className="btn btn-inverse">
                        <a title="" href="#"><i className="icon icon-share-alt"></i>
                        <span className="text">Logout</span></a>
                      </li>
                  </ul>
              </div>

            </div>
          );
      }
    };
    class Nav extends React.Component {
      constructor(props) {
          super(props);
          // 初始化一个空对象
          this.state = {items: []};
      }
      componentDidMount() {
        var rows= [{name: "首页",code: "01", href:"/", icon_class: "icon-home",child: [{name: "首页",href: "/",icon_class: "icon-th"}]},
                  {name: "用户列表",code: "02", href:"admin_user_list", icon_class: "icon-home",child: [{name: "用户列表",href: "/",icon_class: "icon-th"}]},
                  {name: "商品列表",code: "03", href:"admin_product_list", icon_class: "icon-home",child: [{name: "商品列表",href: "/",icon_class: "icon-th"}]},
                  {name: "商品图片",code: "04", href:"admin_product_img", icon_class: "icon-home",child: [{name: "商品图片",href: "/",icon_class: "icon-th"}]},
                ];
        this.setState({items:rows});
        unicorn();
      }

      render() {
        var nav = [];
        this.state.items.map(function(item,index) {
          var c = "submenu";
          if (item.code == selected) {
            c = "submenu active";
          }
          nav.push(<li className={c} key={index}>
            <a href={item.href}><i className={"icon " + item.icon_class}></i> <span>{item.name}</span></a>
            <ul>
              {item.child.map((item,index) => (
                <li key={index}><a href={item.href}>{item.name}</a></li>
              ))
            }
            </ul>
          </li>);
        });

          return (
            <div>
              <div id="sidebar">
          			<ul>
                  {nav}
          			</ul>

          		</div>

            </div>
          );
      }
    };

    class Infor extends React.Component {
      constructor(props) {
          super(props);
          // 初始化一个空对象
      }
      componentDidMount() {
      }
      render() {
        var style = {backgroundColor:'#555555',borderColor:'#aaaaaa'};
        var style1 = {backgroundColor:'#8399b0'};
        var style2 = {backgroundColor:'#2D2F57'};
        var style3 = {backgroundColor:'#673232'};
        var style4 = {backgroundImage:" url('img/demo/red-green.png')",backgroundRepeat: "no-repeat"};
          return (
            <div>
              <div id="style-switcher">
                <i className="icon-arrow-left icon-white"></i>
                <span>Style:</span>
                <a href="#grey" style={style}></a>
                <a href="#light-blue" style={style1}></a>
	              <a href="#blue" style={style2}></a>
			          <a href="#red" style={style3}></a>
                <a href="#red-green" style={style4}></a>
              </div>

              <div id="content">
                <div id="content-header">
                  <h1>商品查看</h1>
                  <div className="btn-group">
                    <a className="btn btn-large tip-bottom" title="Manage Files"><i className="icon-file"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Users"><i className="icon-user"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Comments"><i className="icon-comment"></i><span className="label label-important">5</span></a>
                    <a className="btn btn-large tip-bottom" title="Manage Orders"><i className="icon-shopping-cart"></i></a>
                  </div>
                </div>
                <div id="breadcrumb">
                  <a href="#" title="Go to Home" className="tip-bottom"><i className="icon-tint"></i> XX</a>
                </div>
                <div className="container-fluid">
                  <AddWrap/>
                </div>

              </div>
            </div>
          );
      }
    };
    // add
    class AddWrap extends React.Component {
      constructor(props) {
          super(props);
          // 初始化一个空对象
          this.state={items:[]};
      }
      componentDidMount() {
        selectTwo();
      }
      render() {
        var style = {display:'none' };
        var style1 = {width:'1px'};
          return (
            <div className="row-fluid">
              <div className="span12">
                <div className="widget-box">
                  <div className="widget-title">
                    <span className="icon">
                      <i className="icon-align-justify"></i>
                    </span>
                    <h5>Rest of elements...</h5>
                  </div>
                  <div className="widget-content nopadding">
                    <form action="#" method="get" className="form-horizontal">
                      <div className="control-group">
                        <label className="control-label">供应商</label>
                        <div className="controls">
                          <div className="select2-container" id="s2id_autogen1">

                            <div className="select2-drop select2-with-searchbox select2-offscreen" style={style}>
                             <div className="select2-search">
                              <input type="text" autoComplete="off" className="select2-input" tabIndex="0"/>
                             </div>
                             <ul className="select2-results"></ul>
                            </div>
                          </div>
                          <select style={style}>
                            <option>供应商A</option>
                            <option>供应商B</option>
                            <option>供应商C</option>
                            <option>供应商D</option>
                            <option>供应商E</option>
                            <option>供应商F</option>
                          </select>
                        </div>
                      </div>



                      <div className="control-group">
                        <label className="control-label">门店</label>
                        <div className="controls">
                          <div className="select2-container" id="s2id_autogen1">

                            <div className="select2-drop select2-with-searchbox select2-offscreen" style={style}>
                             <div className="select2-search">
                              <input type="text" autoComplete="off" className="select2-input" tabIndex="0"/>
                             </div>
                             <ul className="select2-results"></ul>
                            </div>
                          </div>
                          <select style={style}>
                            <option>门店A</option>
                            <option>门店C</option>
                            <option>门店B</option>
                            <option>门店D</option>
                            <option>门店E</option>
                            <option>门店F</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-actions">
    										<button type="submit" className="btn btn-primary">保 存</button>
    									</div>
                    </form>
                  </div>
                </div>
              </div>
	          </div>
          );
      }
    };
// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("admin_add_custom")
);
