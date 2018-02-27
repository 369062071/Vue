<template>
  <div class="banner" ref="box">
  </div>
</template>

<script>

export default {
  created () {
    setTimeout(() => {
      console.log(this.$refs.box)
      this.loadScript()
    }, 20)
  },
  mounted () {
  },
  methods: {
    loadScript () {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'
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
