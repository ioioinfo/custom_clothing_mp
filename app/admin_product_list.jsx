var React = require('react');
var ReactDOM = require('react-dom');
var selected = '03';

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
        unicorn();
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
                  <h1>商品列表</h1>
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
                <TableWrap/>
                </div>

              </div>
            </div>
          );
      }
    };



        // 右侧下部表格
        class TableWrap extends React.Component {
            constructor(props) {
                super(props);
                this.setPage=this.setPage.bind(this);
                this.handleSort=this.handleSort.bind(this);
                this.loadData=this.loadData.bind(this);
                this.handleCallBack1 = this.handleCallBack1.bind(this);
                // 初始化一个空对象
                this.state = {tabthitems:[],tabtritems:[],allNum:0,everyNum:20,thisPage:1,sort:{name:"",dir:""}};
            }
            handleCallBack1(tabtritems){
                console.log(tabtritems);
                this.setState({tabtritems:tabtritems});
            }
            loadData(params1) {
                var params = {thisPage:this.state.thisPage,sort:this.state.sort};
                $.extend(params,params1);

                getTableData(params,function(data) {
                    $.extend(data,params1);
                    this.setState(data);
                }.bind(this));
            }

            componentDidMount() {
                this.loadData({});
            }
            setPage(thisPage) {
                this.loadData({thisPage:thisPage});
            }
            handleSort(sort){
                this.loadData({sort:sort});
            }
            render() {

                return (
                    <div>
                        <Table tabthitems={this.state.tabthitems} tabtritems={this.state.tabtritems} sort={this.state.sort} onSort={this.handleSort}  handleCallBack1={this.handleCallBack1} loadData={this.loadData}/>
                        <div className="nav_text"></div>
                        <Tab setPage={this.setPage} allNum={this.state.allNum} everyNum={this.state.everyNum} thisPage={this.state.thisPage} />
                    </div>
                );
            }
        };
        // 表格
        class Table extends React.Component {
            constructor(props) {
                super(props);
                this.state = {tabtritems:this.props.tabtritems};
            }
            render() {
                return (
                  <div className="container-fluid">
            				<div className="row-fluid">
            					<div className="span12">
            						<div className="widget-box">
            							<div className="widget-title">
            								<span className="icon">
            									<i className="icon-th"></i>
            								</span>
            								<h5>商品列表</h5>
            							</div>
            							<div className="widget-content nopadding">
                            <table className="table table-bordered table-striped table-hover">
                              <thead>
                                <tr>
                                {this.props.tabthitems.map((item,index) => (
                                    <Th  key={index}  item={item} sort={this.props.sort} onSort={this.props.onSort} />))
                                }
                              </tr>
                              </thead>
                              <tbody>
                                {this.props.tabtritems.map((item,index )=> (
                                    <Tr  key={index}  item={item} tabthitems={this.props.tabthitems} />))
                                }
                              </tbody>
                            </table>
            							</div>
            						</div>
            					</div>
            				</div>
            			</div>
                );
            }
        };

        class Tr extends React.Component {
            constructor(props) {
                super(props);

                // 初始化一个空对象
                this.state = {};
            }

            render() {
                return (

                    <tr>
                    {this.props.tabthitems.map((item,index) => (
                        <Td  key={index}  item={this.props.item} thitem={item}  />))
                    }
                    </tr>

                );
            }
        };
        class Th extends React.Component {
            constructor(props) {
                super(props);
                this.handleClick=this.handleClick.bind(this);
            }
            handleClick(e){
                var sort = this.props.sort;
                if (!sort) {
                    sort = {name:"",dir:""};
                }

                if (sort.name != this.props.item.name) {
                    sort.dir = "";
                }
                sort.name = this.props.item.name;
                //排序顺序
                if (sort.dir == "asc") {
                    sort.dir = "desc";
                } else {
                    sort.dir = "asc";
                }

                this.props.onSort(sort);
            }
            render() {
                var img= <span></span>;
                if (this.props.item.sort) {
                    var sort = this.props.sort;
                    if (sort && sort.name == this.props.item.name) {
                        if (sort.dir == "desc") {
                            img = <span><img src="images/htpaixu.png" alt="" onClick={this.handleClick}/></span>;
                        } else {
                            img = <span><img src="images/htpaixu1.png" alt="" onClick={this.handleClick}/></span>;
                        }
                    } else {
                        img = <span><img src="images/htpaixu2.png" alt="" onClick={this.handleClick}/></span>;
                    }
                }
                var thStyle = {
                    width:this.props.item.width
                };
                return (
                    <th>{this.props.item.title} {img}</th>
                );
            }
        };
        class Td extends React.Component {
            constructor(props) {
                super(props);
                this.handleEdit=this.handleEdit.bind(this);
                this.handleDelete=this.handleDelete.bind(this);
            }
            handleEdit(e){
                edit_row(this.props.item[this.props.thitem.name]);
            }
            handleDelete(e){
                delete_row(this.props.item[this.props.thitem.name]);
            }
            render() {
                if (this.props.thitem.type == "edit_delete") {

                  return (<td>
                      <button type="button" className="btn btn-primary btn-xs button_margin_left" onClick={this.handleEdit}>查看</button>
                      </td>);
                } else {
                    return (<td>{this.props.item[this.props.thitem.name]}</td>);
                }
            }
        };
        // 分页
        class Tab extends React.Component {
            constructor(props) {
                super(props);
                this.gotoFirst=this.gotoFirst.bind(this);
                this.gotoPrevious=this.gotoPrevious.bind(this);
                this.gotoLast=this.gotoLast.bind(this);
                this.gotoNext=this.gotoNext.bind(this);
            }
            gotoFirst(){
                this.props.setPage(1);
            }
            gotoPrevious(){
                this.props.setPage(this.props.thisPage-1);
            }
            gotoLast(){
                var allNum=this.props.allNum;
                // 每页显示条数everyNum
                var everyNum=this.props.everyNum;
                var allPage=Math.ceil(allNum/everyNum);
                this.props.setPage(allPage);
            }
            gotoNext(){
                this.props.setPage(this.props.thisPage+1);
            }
            render() {
                var fenitems =[];
                // 所有条数allNum
                var allNum=this.props.allNum;
                // 每页显示条数everyNum
                var everyNum=this.props.everyNum;
                // 当前显示页thisPage
                var thisPage=this.props.thisPage;
                var allPage=Math.ceil(allNum/everyNum);
                if(allPage<=7){
                    for(var i=1; i<=allPage; i++){
                        fenitems.push(i);
                    }
                }else {
                    if(thisPage-3<=1){
                        for(var i=1; i<=7; i++){
                            fenitems.push(i);
                        }
                    } else if (thisPage+3>=allPage) {
                        for(var i=allPage-6; i<=allPage; i++){
                            fenitems.push(i);
                        }
                    } else {
                        for(var i=thisPage-3; i<=thisPage+3; i++){
                            fenitems.push(i);
                        }
                    }
                }
                var first = (<span className="table-tab-span1 next fg-button ui-button ui-state-default" onClick={this.gotoFirst}><img src="images/httab4.png" alt="" /></span>);
                var previous=(<li className="next fg-button ui-button ui-state-default" onClick={this.gotoPrevious}><span aria-hidden="true">&laquo;</span></li>);
                var last=(<span className="table-tab-span1 next fg-button ui-button ui-state-default" onClick={this.gotoLast}><img src="images/httab2.png" alt="" /></span>);
                var next=(<li className="next fg-button ui-button ui-state-default" onClick={this.gotoNext}><span aria-hidden="true">&raquo;</span></li>);

                if (thisPage==1) {
                    var first = (<span className="table-tab-span1 next fg-button ui-button" ><img src="images/httab4_1.png" alt="" /></span>);
                    var previous=(<li className="disabled next fg-button ui-button"><span aria-hidden="true">&laquo;</span></li>);
                }
                if(thisPage==allPage){
                    var last = (<span className="table-tab-span1 next fg-button ui-button" ><img src="images/httab2_1.png" alt="" /></span>);
                    var next=(<li className="disabled next fg-button ui-button"><span aria-hidden="true">&raquo;</span></li>);
                }
                return (
                    <div>
                        <nav aria-label="Page navigation dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_full_numbers" className="nav_text">

                            <div className="pagination">
                                {previous}
                                {fenitems.map((item,index) => (
                                    <PageLi key={index}  setPage={this.props.setPage} item={item} setSelected={this.setSelected} selected={thisPage} />))
                                }
                                {next}
                            </div>
                        </nav>
                        <p className="pull-right">
                            <span className="table-tab-span4">共{allPage}页</span>
                            <span className="table-tab-span5">共{allNum}条记录</span>
                        </p>
                    </div>
                );
            }
        };
        // 分页数字
        class PageLi extends React.Component {
            constructor(props) {
                super(props);
                // 初始化一个空对象
                this.handleClick = this.handleClick.bind(this);
            }
            handleClick(e){
                this.props.setPage(this.props.item);

            }
            render() {
                    var c = "fg-button ui-button ui-state-default";
                    if (this.props.item == this.props.selected) {
                        c = "fg-button ui-button ui-state-default active";
                    }
                    return (
                        <a className={c} onClick={this.handleClick}>{this.props.item}</a>
                );
            }
        };

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("admin_product_list")
);
