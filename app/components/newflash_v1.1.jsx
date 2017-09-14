var React = require('react');

class Lunbo extends React.Component {
    constructor(props) {
        super(props);
        this.jump=this.jump.bind(this);
        this.back = this.back.bind(this);
        this.move = this.move.bind(this);
        this.onTouchStart=this.onTouchStart.bind(this);
        this.onTouchMove=this.onTouchMove.bind(this);
        this.onTouchEnd=this.onTouchEnd.bind(this);
        // 初始化一个空对象
        this.state = {imgItems: this.props.items || [],selected:0,touchPage:0,change:0};
    }


    jump(){
        //当前显示图片
        var selected = this.state.selected;
        var imgLength = this.state.imgItems.length;
        var widthUl = $(window).width();

        var next1 = selected + 1;
        if (next1 >= imgLength) {
            next1 = next1 - imgLength;
        }

        //循环所有图片
        $(".imgul li").each(function(index,element) {
            if (index == selected) {
                $(this).css("z-index","10");
                $(this).css("transform","translate3d("+(-widthUl)+"px, 0px, 0px)");
                $(this).css("transition","all 300ms ease");
            } else if (index == next1) {
                $(this).css("z-index","10");
                $(this).css("transform","translate3d(0px, 0px, 0px)");
                $(this).css("transition","all 300ms ease");
            } else {
                $(this).css("z-index","9");
                $(this).css("transform","translate3d("+(widthUl)+"px, 0px, 0px)");
                $(this).css("transition","all 0ms ease");
            }
        });

        this.setState({selected:next1});
    }
    //向右移动一张
    back(){
        //当前显示图片
        var selected = this.state.selected;
        var imgLength = this.state.imgItems.length;
        var widthUl = $(window).width();

        var prev1 = selected - 1;
        if (prev1 < 0) {
            prev1 = imgLength - 1;
        }

        //循环所有图片
        $(".imgul li").each(function(index,element) {
            if (index == selected) {
                $(this).css("z-index","10");
                $(this).css("transform","translate3d("+(widthUl)+"px, 0px, 0px)");
                $(this).css("transition","all 300ms ease");
            } else if (index == prev1) {
                $(this).css("z-index","10");
                $(this).css("transform","translate3d(0px, 0px, 0px)");
                $(this).css("transition","all 300ms ease");
            } else {
                $(this).css("z-index","9");
                $(this).css("transform","translate3d("+(-widthUl)+"px, 0px, 0px)");
                $(this).css("transition","all 0ms ease");
            }
        });

        this.setState({selected:prev1});
    }
    move(change){
        var widthUl = $(window).width();
        if(change<-widthUl/8){
            this.jump();
        }else if (change>widthUl/8) {
            this.back();
        }
    }
    componentDidMount() {
        $(".imgul li").css("width",$(window).width());
        var rate = this.props.rate;
        if (!rate) {
            rate = 1;
        }

        var imgLIheight = rate*$(window).width();
        $(".imgul").css("height",imgLIheight);
        var imgLength = this.state.imgItems.length;
        var widthUl = $(window).width();
        //循环所有图片
        $(".imgul li").each(function(index,element) {
            if (index == 0) {
                $(this).css("z-index","10");
            } else if (index == 1) {
                $(this).css("transform","translate3d("+widthUl+"px, 0px, 0px)");
                $(this).css("transition","all 0ms ease");
            } else if (index == imgLength-1) {
                $(this).css("z-index","10");
                $(this).css("transform","translate3d("+(-widthUl)+"px, 0px, 0px)");
                $(this).css("transition","all 0ms ease");
            } else {
                $(this).css("z-index","9");
                $(this).css("transform","translate3d("+widthUl+"px, 0px, 0px)");
                $(this).css("transition","all 0ms ease");
            }
        });

        if (this.state.imgItems.length > 1) {
            this.timer = setInterval(this.jump,1500);

        }
    }

    // 开始
    onTouchStart(e){
        if (this.state.imgItems.length <= 1) {
            return;
        }
        if (this.timer) {
            clearInterval(this.timer);
        }

        var touch = e.targetTouches[0];//touches数组对象获得屏幕上所有的touch，取第一个touch
        var touchPageStart=touch.pageX; //获取当前最新的坐标

        this.setState({touchPage:touchPageStart,change:0});
    }

    // 移动中
    onTouchMove(e){
        if (this.state.imgItems.length <= 1) {
            return;
        }
        var touchPageMove=e.targetTouches[0].pageX; //获取当前最新的坐标

        var touchPage = this.state.touchPage;
        var change = touchPageMove-touchPage;

        this.setState({change:change});
    }
    // 移动结束
    onTouchEnd(e){
        if (this.state.imgItems.length <= 1) {
            return;
        }
        var change = this.state.change;
        this.move(change);
    }
    render() {
        return (
            <div className="flashWrap">
            <ul className="imgul" onTouchStart={this.onTouchStart} onTouchMove ={this.onTouchMove } onTouchEnd={this.onTouchEnd}>
            {this.state.imgItems.map(item => (
                <FlashImgLi key={item.id} item={item} />))
            }
            </ul>

            <div className="pointul">
            {this.state.imgItems.map((item,index) => (
                <FlashPointLi key={index} selected={this.state.selected} index={index} />))
            }
            </div>

            </div>
        );
    }


}
// 图片
class FlashImgLi extends React.Component {
    componentDidMount() {
        $(".imgul li").css("width",$(window).width());
        $(".imgul li img").css("width",$(window).width());
    }
    render() {
        var imgsec = this.props.item.img;
        return(
            <li className="pull-left"><a href={this.props.item.href || "javascript:void(0)"}><img src={imgsec} className="img-responsive" alt="" /></a></li>
        );
    }

}

// 点
class FlashPointLi extends React.Component {
    render() {

        var c = "";
        if(this.props.selected == this.props.index){
            c = "on";
        }
        return (
            <span className={c}></span>
        );
    }

}

module.exports = Lunbo;
