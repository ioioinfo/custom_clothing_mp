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
          <ProjectBottom/>
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

class ProjectBottom extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_sort_bottom">
          <ProjectsortNav/>
          <ProjectsortInfor/>
        </div>
      );
    }
};

class ProjectsortNav extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      $('.project_sort_nav li:nth-child(1)').attr('id','nav_style');
    }
    handleClick(id){
      $('.project_sort_infor ul').hide();
      $('.project_sort_nav li').removeAttr('id');
      $('#project_sort_infor_ul_' + id).show();
      $('.project_sort_nav_infor_' + id).attr('id','nav_style');
    }

    render() {
      return (
        <ul className="project_sort_nav">
          <li className="project_sort_nav_infor project_sort_nav_infor_1" onClick={this.handleClick.bind(this,1)}>蔬菜</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_2" onClick={this.handleClick.bind(this,2)}>水果</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_3" onClick={this.handleClick.bind(this,3)}>肉禽蛋</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_4" onClick={this.handleClick.bind(this,4)}>水产海鲜</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_5" onClick={this.handleClick.bind(this,5)}>乳饮西点</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_6" onClick={this.handleClick.bind(this,6)}>点心速食</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_7" onClick={this.handleClick.bind(this,7)}>粮油副食</li>
          <li className="project_sort_nav_infor project_sort_nav_infor_8" onClick={this.handleClick.bind(this,9)}>酒水饮料</li>
        </ul>
      );
    }
};

class ProjectsortInfor extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      $('.project_sort_infor ul').hide();
      $('.project_sort_infor ul:nth-child(1)').show();
    }
    render() {
      return (
        <div className="project_sort_infor">

          <ul className="project_sort_infor_ul" id="project_sort_infor_ul_1">
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img2.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img2.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img2.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img2.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
          </ul>
          <ul className="project_sort_infor_ul" id="project_sort_infor_ul_2">
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img3.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img3.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img3.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
            <li className="project_sort_infor_li">
              <p className="project_sort_infor_li_img"><img src="images/img3.jpg"/></p>
              <p className="project_sort_infor_li_name">蔬菜</p>
            </li>
          </ul>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("product_sort")
);
