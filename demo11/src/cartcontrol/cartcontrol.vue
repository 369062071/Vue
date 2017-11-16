<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
                <span class="inner"> - </span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">
            {{ food.count }}
        </div>
        <div class="cart-add" @click="addCart">
            +
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import Bus from '../bus'
    export  default {
        props:{
            food:{
                type:Object
            }
        },
        data () {
          return {

          }
        },
        created () {
//            console.log(this.food)
        },
        methods:{
            addCart(event) {
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
//                    this.food.count = 1;
                    Vue.set(this.food,'count',1);
                }else{
                    this.food.count++;
                }
                //组件传值
                Bus.$emit('cart-add',event.target);
            },
            decreaseCart (event) {
                if(!event._constructed){
                    return;
                }
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding: 6px
            font-size 24px
            opacity 1
            color: rgb(0,160,220)
            .inner
                display inline-block
                line-height 24px
                color rgb(0,160,220)
                transition all .4s linear
                transform rotate(0)
            &.move-enter-active, &.move-leave-active
                transition all .4s linear
            &.move-enter, &.move-leave-to
                opacity 0
                transform translate3D(24px, 0, 0)
                .inner
                    transform rotate(180deg)
        .cart-count
            display inline-block
            vertical-align  top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
        .cart-add
            display inline-block
            padding: 6px
            line-height 24px
            font-size 24px
            color: rgb(0,160,220)

</style>