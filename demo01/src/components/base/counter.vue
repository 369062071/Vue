<template>
    <div class="counter-component">
      <div class="counter-btn" @click='minus'> - </div>
      <div class="counter-show">
        <input type="text" v-model='buyNum'>
      </div>
      <div class="counter-btn" @click='maxus'> + </div>
    </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 20
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      buyNum: this.min
    }
  },
  methods: {
    fixNumber () {
      let fix
      if (typeof this.buynum === 'string'){
        fix = Number(this.buynum.replace(/\D/g,''))
      }else{
        fix = this.buynum
      }
    },
    minus () {
      if(this.buyNum <= this.min){
        return
      }
      this.buyNum--
      console.log(this.buyNum)
    },
    maxus () {
      if(this.buyNum >= this.max){
        return
      }
      this.buynum++
    }
  }

}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}

</style>
