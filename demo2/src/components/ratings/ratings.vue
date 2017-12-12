<template>
<<<<<<< HEAD
    <div></div>
=======
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left" >
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="score">{{ seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select :select-type.sync="selectType" :only-content.sync="onlyContent"  :ratings="ratings" :desc="desc"></rating-select>
            <div class="rating-wrapper">
                <ul>
                    <!-- <li v-for="(rating,index) in ratings" :key="index" class="">
                        <div class="avatar">
                            <img :src="rating.avatar" >
                        </div>
                        <div class="content">
                            <h1 class="name">{{ rating.username }}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating"></star>
                                <!-- <span class="delivery" v-show="">{{ rating.deliveryTime }}</span>
                                <p class="text">{{ rating.text }}</p>
                                <div class="recommend">
                                    <span class="icon-thumb_up"></span>
                                    <span v-for="item in rating"></span>
                                </div> 

                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>

>>>>>>> f3a9037701050aace6b5c514dc77074be720df4d
    
</template>

<script type="text/ecmascript-6">
    import Star from '../star/star.vue'
    import Split from '../split/split.vue'
    import RatingSelect from '../ratingselect/ratingselect.vue'

    const ALL = 2;

    export default {
        components: {
            Star,
            Split,
            RatingSelect
        },  
        props:{
            seller:{
                type:Object
            }
        },
      
        data() {
            return {
                showFlag: false,
                selectType : ALL,
                onlyContent: true,
                ratings: [],
                desc:{
                    all: '全部',
                    positives: '推荐',
                    negative: '吐槽'
                }
            
            }
        },
        created () {
            this.axios.get("src/common/data.json").then( (res) => {
                console.log(res.data.ratings)
                this.ratings = res.data.ratings;
            })
        }
        ,
        methods: {
            
        }
    }
</script>

<style lang="stylus" scoped>
    .ratings
        position: absolute;
        top 174px
        bottom 0
        left 0
        width 100%;
        .overview
            display flex
            padding 18px 0
            .overview-left
                flex 0 0 137px;
                width 137px
                padding 6px 0
                text-align center
                border-right 1px solid rgba(7,17,27,.2)
                @media only screen and (max-width: 320px) {
                    flex 0 0 120px
                    width 120px
                }
                .score 
                    padding-bottom 3px
                    line-height 28px
                    font-size 24px
                    color rgb(255,153,0)
                .title
                    margin-bottom 8px
                    line-height 12px
                    font-size 12px
                    color rgb(7,17,27)
                .rank
                    padding-bottom 6px
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)
            .overview-right
                flex 1
                padding 6px 0 6px 24px
                @media only screen and (max-width: 320px) {
                    padding-left 6px
                }
                .score-wrapper
                    margin-bottom 8px
                    font-size 0
                    .title
                        display inline-block
                        line-height 18px      
                        vertical-align top
                        font-size 12px
                        color rgb(7,17,27)
                    .star
                        display inline-block
                        margin 0 12px
                        vertical-align top
                        @media only screen and (max-width: 320px) {
                            margin 0 10px
                        }
                    .score
                        display inline-block
                        vertical-align top
                        line-height 18px                        
                        font-size 12px
                        color rgb(255,153,0)
                .delivery-wrapper
                    font-size 0
                    .title
                        display inline-block
                        line-height 18px      
                        font-size 12px
                        color rgb(7,17,27)
                    .score
                        font-size 12px
                        margin-left 12px 
                        color #93999f
</style>        
