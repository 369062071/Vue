<template>
  <div class="slide-show" @mouseover='clearInv' @mouseout='runInv'>
    <div class="slide-img" v-for="(item,index) in slide">
      <a :href="slide[nowIndex].href">
        <transition name="slide-trans">
          <img :src="slide[nowIndex].src" v-if="isShow">
        </transition>
        <transform name='slide-trans-old'>
          <img :src="slide[nowIndex].src" v-if="!isShow">
        </transform>
      </a>
    </div>
    <h2>{{ slide[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click='goto(prevIndex)'>&lt;</li>
      <li v-for='(item,index) in slide'>
        <a @click='goto(index)' :class="{on: nowIndex === index }">{{ index + 1 }}</a>
      </li>
      <li @click='goto(nextIndex)'>&gt;</li>
    </ul>
  </div>
</template>

<script>
  export default{
    props:{
      slide:{
        type:Array,
        default:[]
      },
      interval:{
        type:Number,
        default: 1000
      }
    },
    computed:{
      prevIndex(){
        if(this.nowIndex === 0){
          return this.slide.length - 1
        }else{
          return this.nowIndex - 1
        }
      },
      nextIndex(){
        if(this.nowIndex === this.slide.length -1){
          return 0
        }else{
          return this.nowIndex + 1
        }
      }
    },
    data(){
      return {
        nowIndex:0,
        isShow:true
      }
    },
    methods : {
      goto(index){
        this.isShow = false;
        setTimeout(() => {
          this.isShow=true;
          this.nowIndex=index;
        },10)

      },
      runInv(){
        this.invID =  setInterval(() => {
          this.goto(this.nextIndex)
        },this.interval)
      },
      clearInv(){
        clearInterval(this.invID)
      }
    },
    mounted(){
      this.runInv()
        console.log(this.slide)
    }
  }
</script>

<style lang="css" scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
