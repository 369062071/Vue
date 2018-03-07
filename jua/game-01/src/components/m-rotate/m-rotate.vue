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
      w: 0,
      r: 0,
      num: 6,
      isRotate: false
    }
  },
  mounted () {
  },
  methods: {
    onPlay () {
      if (!this.isRotate) {
        this.isRotate = true
        // this.$refs.prize.className = 'prize'
        this.$refs.prize.style[transition] = 'all 3s'
        this.$refs.prize.style[transform] = `rotate(212deg)`
        console.log(this.$refs.prize)
      }
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
