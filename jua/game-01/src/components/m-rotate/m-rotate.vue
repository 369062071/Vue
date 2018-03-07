<template>
  <div class="rotate">
    <p class="title">今日免费次数:<span>8</span>次</p>
    <div class="rotate-bg">
      <div class="prize-wrapper" ref="canvas-wrapper">
        <div class="prize" ref="prize"></div>
        <div class="m-btn">
          <button type="button" 
            :class="isRotate ? 'disable' : '' "
            class="btn-play" 
            @click="onPlay"
            ref="btnPlay"
            >点击抽奖</button>
        </div>
      </div>
    </div>
    <div class="pop-up" v-show="isPopShow">

    </div>
  </div>
</template>

<script>
import {prefixStyle} from '@/common/js/dom'
import {data} from '@/data'

const transform = prefixStyle('transform')
const transition = prefixStyle('transition')

export default {
  components: {
  },
  data () {
    return {
      banners: data.banners,
      isPopShow: false,
      isRotate: false,
      rotateTime: 0,
      rotateAngle: 0,
      fisrtAngle: 212,
      timer: null
    }
  },
  mounted () {
    // this.getRandom()
    this.init()
  },
  methods: {
    init () {
      this.setStart()
    },
    onPlay () {
      if (!this.isRotate) {
        clearInterval(this.timer)
        this.timer = null
        this.getRandom()
        this.setAngle(this.rotateAngle, this.rotateTime)
        console.log(this.$refs.prize.style[transform])
        this.isRotate = true
        // this.$refs.prize.className = 'prize'
        this.resetRotate(this.rotateTime)
      }
    },
    setAngle (angle, time) {
      this.$refs.prize.style[transition] = 'all ' + time + 's'
      this.$refs.prize.style[transform] = 'rotate(' + angle + 'deg)'
    },
    getRandom () {
      this.rotateTime = (Math.random() * 2 + 2).toFixed(1)
      this.rotateAngle = this.rotateAngle + (Math.floor(Math.random() * 4 + 2) * 360 + this.fisrtAngle)
      this.fisrtAngle = 0
      console.log(this.rotateTime, Math.floor(Math.random() * 4 + 2) * 360)
    },
    setStart () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.rotateAngle >= 350) {
          this.rotateAngle = 0
        }
        this.rotateAngle = this.rotateAngle + 0.1
        this.setAngle(this.rotateAngle)
      }, 40)
    },
    resetRotate (time) {
      setTimeout(() => {
        console.log('定时器执行了')
        this.isRotate = false
        this.isPopShow = true
      }, time * 1000 + 1000)
    }
  },
  watch: {
    // w (old, news) {
    //   console.log(old, news)
    //   console.log(this.$refs.canvas)
    //   this.$refs.canvas.width = this.w
    //   this.$refs.canvas.height = this.w
    // }
  }
}
</script>

<style  scoped>
  .rotate {
    position: relative;
  }
  .title {
    margin-top: 0.05rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }
    
  .rotate-bg{
    width: 3.2rem;
    height: 3.25rem;
    margin:  0.1rem auto 0;
    background: url(../../images/rotate-bg.gif);
    background-size: cover;
    position: relative;
  }
    
  .prize-wrapper{
    width: 2.25rem;
    height: 2.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-49%, -50%);
  }

  .prize {
    width: 100%;
    height: 100%;
    /* transition: all 3s; */
    background: url(../../images/prize.png) no-repeat;
    background-size: cover;
  }

  .m-btn {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    border: 1px solid #333;
    background: #fe8f22;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-play{
    width: 90%;
    height: 90%;
    padding: .1rem;
    border: none;
    outline: none;
    font-size: .2rem;
    color: #fff;
    background: url(../../images/circle.png) no-repeat;
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-play.disable{
    border-radius: 50%;
    background: rgb(126, 126, 126);
  }

  .pop-up {
    width: 100%;
    height: 200px;
    background: #333;
    position: absolute;
    top: 0;
    left: 0;
  }
  @keyframes myrotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
      
  .prize.play {
    animation: myrotate 20s infinite linear
  }
        
</style>
