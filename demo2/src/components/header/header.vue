<template lang="html">
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
              <img width="64" height="64" :src="seller.avatar" @click="clickHandle">
            </div>
            <div class="content">
              <div class="title">
                <span class="brand"></span>
                <span class="name">{{ seller.name }}</span>
              </div>
              <div class="description">
                {{ seller.description }}/
                {{ seller.deliveryTime}}分钟送达
              </div>
              <div class="supports" v-if="seller.supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{ seller.supports[0].description}}</span>
              </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{ seller.supports.length }}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
          <div v-show="detailShow" class="detail" >
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name"> {{ seller.name }}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]" ></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{ seller.bulletin }}</p>
                    </div>
               </div>
              </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>


    </div>
</template>

<script type="text/ecmascript-6">
//import base from '../../common/stylus/base.styl'
import star from "../../components/star/star.vue";
export default {
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    },
    clickHandle(){
        console.log(this.seller)
    }
  }
};
</script>

<style lang="stylus" scoped>
.header {
    color: #fff;
    position: relative;
    background: rgba(7, 17, 27, 0.5);

    .content-wrapper {
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;

        .avatar {
            display: inline-block;
            vertical-align: top;

            img {
                border-radius: 2px;
            }
        }

        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;

            .title {
                margin: 2px 0 8px;

                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    background: url('brand@2x.png') no-repeat center;
                    background-size: 30px 18px;

                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }
            }

            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }

            .supports {
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;

                    &.decrease {
                        background: url('decrease_1@2x.png') no-repeat;
                        background-size: 12px 12px;
                    }

                    &.discount {
                        background: url('discount_1@2x.png');
                        background-size: 12px 12px;
                    }

                    &.guarantee {
                        background: url('guarantee_1@2x.png');
                        background-size: 12px 12px;
                    }

                    &.invoice {
                        background: url('invoice_1@2x.png');
                        background-size: 12px 12px;
                    }

                    &.special {
                        background: url('special_1@2x.png');
                        background-size: 12px 12px;
                    }
                }

                .text {
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }

        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;

            .count {
                font-size: 10px;
            }

            .icon-keyboard_arrow_right {
                font-size: 10px;
                margin-left: 2px;
                line-height: 24px;
            }
        }
    }

    .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .bulletin-title {
            display: inline-block;
            width: 22px;
            height: 12px;
            background: url('bulletin@2x.png') no-repeat;
            background-size: 22px 12px;
        }

        .bulletin-text {
            font-size: 10px;
            margin: 0 4px;
        }
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }

    .detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        opacity: 1;

        &.fade-enter {
            opacity: 0;
        }

        &.fade-enter-active {
            transition: all 0.5s;
        }

        &.fade-leave-active {
            opacity: 0;
            transition: all 0.5s;
        }

        .detail-wrapper {
            min-height: 100%;

            &::before {
                display: table;
                content: '';
            }

            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;

                .name {
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: bold;
                }

                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }

                .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px;

                    .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }

                    .text {
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: bold;
                    }
                }

                .supports {
                    width: 80%;
                    margin: 0 auto;

                    .support-item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px;
                            background-repeat: no-repeat;

                            &.decrease {
                                background: url('decrease_1@2x.png') no-repeat;
                                background-size: 16px;
                            }

                            &.discount {
                                background: url('discount_1@2x.png');
                                background-size: 16px;
                            }

                            &.guarantee {
                                background: url('guarantee_1@2x.png');
                                background-size: 16px;
                            }

                            &.invoice {
                                background: url('invoice_1@2x.png');
                                background-size: 16px;
                            }

                            &.special {
                                background: url('special_1@2x.png');
                                background-size: 16px;
                            }
                        }

                        .text {
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }

                .bulletin {
                    width: 80%;
                    margin: 0 auto;

                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }

        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>
