<template>
  <div>
    <my-dialog >
      <div class="button" is-show='show'>
        支付成功
      </div>
      <div class="button" >
        支付失败
      </div>
    </my-dialog>
    <my-dialog :is-show="isShowErrDialog">
      支付失败！
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from './dialog.vue'
export default {
  components: {
    MyDialog
  },
  props:{
    show:{
      type: Boolean,
      default: false
    },
    isShowErrDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowCheckDialog: false,
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
