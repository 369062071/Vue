<template>
  <div class="banner" ref="box">
  </div>
</template>

<script>

export default {
  created () {
    setTimeout(() => {
      console.log(this.$refs.box)
      // this.loadScript()
    }, 20)
  },
  mounted () {
  },
  methods: {
    loadScript () {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = './demo.js'
      console.log(this.$refs.box)
      this.$refs.box.appendChild(script)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .banner
    color #333
</style>
