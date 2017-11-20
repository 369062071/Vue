<template>
    <div class="star" :class="starType">
        <span v-for="item in itemClasses" :class="item" class="star-item"></span>
        <span>{{ score }}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    const length=5;
    const cls_on='on';
    const cls_half = 'half';
    const cls_off = 'off';
    export default {
        props:{
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{
            starType(){
                return 'star-'+this.size
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2)/2;
                let hasDecimal = score % 1 !== 0;
                let integer =Math.floor(score);
                for(let i=0; i<integer; i++){
                    result.push(cls_on);
                }
                if(hasDecimal){
                    result.push(cls_half)
            }
            while ( result.length < length){
                    result.push( cls_off)
            }
            return result;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .star
        font-size :0
        .star-item
            display :inline-block
            background-repeat :no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                &:last-child
                    margin-right 0
                &.on
                    background url("images/star48_on@2x.png")
                    background-size :20px 20px
                &.half
                    background url("images/star48_half@2x.png")
                    background-size :20px 20px
                &.off
                    background url("images/star48_off@2x.png")
                    background-size :20px 20px
        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size :15px
                &:last-child
                    margin-right 0
                &.on
                    background url("images/star36_on@2x.png")
                    background-size :15px
                &.half
                    background url("images/star36_half@2x.png")
                    background-size :15px
                &.off
                    background url("images/star36_off@2x.png")
                    background-size :15px
        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size :10px
                &:last-child
                    margin-right 0
                &.on
                    background url("images/star24_on@2x.png")
                    background-size :10px
                &.half
                    background url("images/star24_half@2x.png")
                    background-size :10px
                &.off
                    background url("images/star24_off@2x.png")
                    background-size :10px
</style>