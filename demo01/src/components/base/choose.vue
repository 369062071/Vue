<template lang="html">
  <div class="chooser-component">
      <ul class="chooser-list">
        <li v-for='(item,index) in selections'
        :class="{active: index===nowIndex}"
        :title="item.label"
        @click='clickProduct(index)'>
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default : 'test',
      value: 0
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    clickProduct (index) {
      this.nowIndex = index;
      this.$emit('on-choose',this.nowIndex)
    }
  }
}
</script>

<style lang="css" scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
