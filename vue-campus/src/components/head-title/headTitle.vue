<template>
  <div class="container">
    <a class="back" @click="back"></a>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    back () {
      window.history.go(-1)
    }
  }
}
</script>

<style  scoped>
  .container{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 17px;
    color: #2b2d2f;
    background: #fff;
    position: relative;
  }

  .back{
    position: absolute;
    top: 0;
    left: 0;
    width: 44px;
    height: 44px;
    background: url(http://oss1.lanlanlife.com/bf73986fc04814a64815b1f2135c2898_34x19.png) no-repeat center;
    background-size: 9.5px 17px;
  }
</style>
