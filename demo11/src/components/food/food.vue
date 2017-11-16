<template>
    <div v-show="showFlag" class="food">

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:{
            food:{
                type:Array
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .food
        position fixed
        left: left
        top:0
        bottom 48px
        z-index 30
        width 100%
        background #fff


</style>