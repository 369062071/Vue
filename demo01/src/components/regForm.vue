<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label"></span>
        <div class="g-form-input">
          <input type="text"
           placeholder="请输入用户名"
           v-model='userName'>
        </div>
        <span class="g-form-error">{{ userErrors.errorText}} </span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click='onreg'>注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      userName : '',
      uPattern: /^[a-zA-Z0-9_-]{4,8}$/

    }
  },
  computed : {
    userErrors () {
      let errorText, status;
      if(!this.uPattern.test(this.userName)){
        status = false;
        errorText = '格式错误'
      } else {
        status = true ,
        errorText = ''
      }
      if(!this.userFlag){
        errorText = '';
        this.userFlag = true
      }
      return{
        status,
        errorText
      }
    }
  },
  methods : {
    onreg () {
      if(!this.userErrors.status){
        alert('错误')
      } else {
        this.userErrors.errorText = '';
        this.$http.get('http://localhost:3000/login')
        .then((data) => {
          this.$emit('reg-data',data.data)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 50%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  padding: 2%;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
