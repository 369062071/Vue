<template>
    <div>
        <div  class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper ">
                        <div class="logo" :class="{'highlight': totalCount > 0 }">
                            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">
                            {{ totalCount }}
                        </div>
                    </div>
                    <div class="price" :class="{'highlight': totalPrice > 0}">{{ totalPrice }}元</div>
                    <div class="desc" >另需配送费{{ deliveryPrice }}元</div>
                </div>
                <div class="content-right" >
                    <div class="pay" :class="payClass" @click="pay">
                        {{ payDesc }}
                    </div>
                </div>
            </div>
            <div class="ball-container" >
                <div v-for="ball in balls">
                    <transition  @before-enter="beforeEnter" @enter="enter" @after-enter="leave">
                        <span  v-show="ball.show" class="ball" >
                            <span class="inner inner-hook"></span>
                        </span>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{ food.name }}</span>
                                <div class="price">
                                    <span>￥{{ food.price*food.count }}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food="food"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>

    </div>

</template>

<script>
    import Bus from '../../bus'
    import CartControl from '../../cartcontrol/cartcontrol.vue'
    import BScroll from 'better-scroll'

    export default{
        components:{
          CartControl
        },
        props:{
            selectFoods:{
              type:Array
            },
            deliveryPrice:{
                type:Number,
                default: 0
            },
            minPrice:{
                type:Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show:false,
                        id:1
                    },
                    {
                        show:false,
                        id:2
                    },
                    {
                        show:false,
                        id:3
                    },
                    {
                        show:false,
                        id:4
                    },
                    {
                        show:false,
                        id:1
                    }
                ],
                dropBalls:[],
                fold: true
            }
        },
        methods: {
            beforeEnter(el){
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el,done){
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            },
            leave(el) {
                let ball = this.dropBalls.shift();
                if(ball){
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList(){
                if(!this.totalCount){
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                console.log(this.selectFoods)
                this.selectFoods.forEach( (food) => {
                    food.count = 0;
                })
            },
            hideList(){
                this.fold = true;
            },
            pay(e) {
                e.stopPropagation();
                if (this.totalPrice < this.minPrice){
                    return ;
                }
                alert(`支付${ this.totalPrice }元`)
            }

        },
        created(){
            //接受小球dome
            Bus.$on('cart-add', el => {
                for(let i = 0; i < this.balls.length; i++ ) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            })
        },
        computed:{
            totalPrice(){
                let total = 0;
                this.selectFoods.forEach( (food) =>{
                    total += food.price * food.count;
                } )
                return total;
            },
            totalCount(){
                let count = 0;
                this.selectFoods.forEach( (food) => {
                    count += food.count
                })
                return count
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`
                }else if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                }else {
                    return "去结算"
                }
            },
            payClass(){
                if(this.totalPrice < this.minPrice){
                    return 'not-enough';
                }else {
                    return 'enough'
                }
            },
            listShow(){
                if( !this.totalCount ){
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if(show) {
                    this.$nextTick( () => {
//                        不存在就实例化
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
//                            存在就调用refresh接口
                        } else {
                            this.scroll.refresh();
                        }

                    })
                }


                return show;

            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/minxin.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            .content-left
                flex 1
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    margin 0 12px
                    padding 6px
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        text-align center
                        background #2b343c
                        &.highlight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            line-height 44px
                            font-size 24px
                            font-style normal;
                            color #80858a
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top: 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight:bold
                        color #fff
                        background rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    padding-right 12px
                    margin: 12px 0 0 0
                    box-sizing border-box
                    border-right 1px solid rgba(255,255,255,.1)
                    font-size 16px
                    color rgba(255,255,255,.4)
                    &.highlight
                        color #fff
                .desc
                    display inline-block
                    vertical-align top
                    margin 12px 0 0 12px
                    line-height 24px
                    color rgba(255,255,255,.4)
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height: 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    color rgba(255,255,255,.4)
                    font-weight bold
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
        .ball-container
            .ball
                display block
                position absolute
                left 32px
                bottom 22px
                z-index 200
                transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    display block
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0, 160, 220)
                    transition: all .5s linear




        .shopcart-list
            position:absolute
            top:0
            left 0
            z-index -1
            width 100%
            transform translate(0,-100%)
            &.fold-enter-active,&.fold-leave-active
                transition all .5s linear
            &.fold-enter,&.fold-leave-to
                 transform translate(0,0)
            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                background #f3f5f7
                border-bottom 1px solid rgba(7,17,27,.1)
                .title
                    float left
                    font-size 14px
                    color rgb(7,12,27)
                .empty
                    float right
                    font-size 12px
                    color rgb(0,160,220)
            .list-content
                padding 0 18px
                max-height 217px
                background #fff
                overflow hidden
                .food
                    position: relative
                    padding: 12px 0
                    box-sizing border-box
                    border-1px(rgba(7,17,27,.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rgb(7,17,27)
                    .price
                        position:absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        color rgb(240,20,20)
                    .cartcontrol-wrapper
                        position absolute
                        right  0
                        bottom 6px

    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        opacity 1
        background rgba(0,0,0,.7)
        &.fade-enter-active,&.fade-leave-active
            transition all .5s
        &.fade-enter,&.fade-leave-to
            opacity 0
</style>