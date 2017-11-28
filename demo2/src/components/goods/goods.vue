<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item"
                        :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon"
                              :class="classMap[item.type]"></span>
                        {{ item.name }}
                    </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper" >
                <ul>
                    <li  v-for="item in goods" class="food-list food-list-hook">
                        <h1 class="title">{{ item.name }}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{ food.name }}</h2>
                                    <p class="desc">{{ food.description }} </p>
                                    <div class="extra">
                                        <span class="count"> 月售{{ food.sellCount }}</span><span>好评率{{ food.rating }}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}  </span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cart-control :food="food"></cart-control>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shop-cart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                       :minPrice="seller.minPrice" ></shop-cart>
        </div>
        <food :food="selectedFood" ref="food"></food>
    </div>


</template>

<script>
    import BScroll from 'better-scroll';
    import ShopCart from '../shopcart/shopcart.vue'
    import CartControl from '../../cartcontrol/cartcontrol.vue'
    import Food from '../food/food.vue'


    export default {
        components:{
            ShopCart,
            CartControl,
            Food
        },
        props:{
          seller:{
              type:Object
          }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood:{}
            }
        },
        methods: {
            _initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click: true //BScroll会阻止点击事件
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    click: true,
                    probeType: 3 //监听实时滚动的位置
                });
                //监听滚动坐标，映射左侧索引值
                this.foodsScroll.on("scroll",(pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight(){
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                //将高度push进foodList
                this.listHeight.push(height);
                for(let i=0;i<foodList.length;i++){
                    let item = foodList[i];
                    height +=item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu (index, event) {
                //在PC端浏览器模式下点击事件执行两次
                //event._constructed 我们主动派发这个事件会有这个属性，默认为true，
                // 浏览器原生无此属性，当浏览器监听到这个事件return，逻辑不执行
                if(!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                console.log(el)
                this.foodsScroll.scrollToElement(el,300);
                console.log(index)
            },
            //点击菜品查看详情
            selectFood(food,event) {
                //阻止两次点击
                if(!event._constructed){
                    return;
                }
                this.selectedFood = food;
                //子组件方法
                this.$refs.food.show();
            }
        },
        computed:{
            //计算滚动区间
            currentIndex(){
              for(let i=0; i<this.listHeight.length; i++) {
                  let height1 = this.listHeight[i];
                  let height2 = this.listHeight[i+1];
                  if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                      return i;
                  }
              }
              return 0;
            },
            selectFoods(){
                let foods  = [];
                this.goods.forEach( (good) =>{
                    good.foods.forEach( (food) => {
                        if (food.count){
                            foods.push(food);
                        }
                    } )
                })
                return foods;
        }

        },
        created () {
            this.axios.get("src/common/data.json")
                .then( (res) => {
                    this.goods = res.data.goods;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    })
                });
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/minxin.styl"

    .goods
        display: flex
        position :absolute
        top: 174px
        bottom:46px
        width: 100%
        overflow :hidden
        .menu-wrapper
            flex: 0 0 80px
            width :80px
            background :#f3f5f7
            .menu-item
                display :table
                height: 54px
                width: 56px
                line-height :14px
                padding:0 12px
                &.current
                    position relative
                    z-index 10
                    margin-top -1px
                    background #fff
                    font-weight:bold
                    .text
                        border-none()
                .icon
                    display: inline-block
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    &.decrease
                        background: url('decrease_3@2x.png') no-repeat
                        background-size: 12px 12px
                    &.discount
                        background: url('discount_3@2x.png')
                        background-size: 12px 12px
                    &.guarantee
                        background: url('guarantee_3@2x.png')
                        background-size: 12px 12px
                    &.invoice
                        background: url('invoice_3@2x.png')
                        background-size: 12px 12px
                    &.special
                        background: url('special_3@2x.png')
                        background-size: 12px 12px

                .text
                    display :table-cell
                    width :56px
                    vertical-align :middle
                    font-size :12px
                    border-1px(rgba(7,17,27,.1))
        .foods-wrapper
            flex :1
            .title
                padding-left :14px
                height :26px
                line-height :26px
                border-left:2px solid #d9dde1
                font-size: 12px
                color: rgb(147,153,159)
                background: #f3f5f7
            .food-item
                display :flex
                margin: 18px
                padding-bottom :18px
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    border-none()
                    margin-bottom :0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex:1
                    .name
                        margin : 2px 0 8px
                        height :14px
                        line-height 14px
                        font-size 14px
                        color rgb(7,17,27)
                    .desc, .extra
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
                        margin-bottom 8px
                    .extra
                        .count
                            margin-right 12px
                    .price
                        font-weight bold
                        line-height: 24px
                        .now
                            margin-right 18px
                            font-size 14px
                            color rgb(240,20,20)
                        .old
                            text-decoration line-through
                            font-size 10px
                            color rgb(147,153,159)


                    .cartcontrol-wrapper
                        position: absolute
                        right 0
                        bottom 12px
</style>
