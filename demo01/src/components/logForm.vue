<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text"
          placeholder="请输入用户名"
          v-model="usernameModel">

        </div>
        <span class="g-form-error"> {{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password"
           placeholder="请输入密码"
           v-model="passwordModel">
        </div>
        <span class="g-form-error"> {{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="clickLogin">登录</a>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      usernameModel: '' ,
      passwordModel: ''
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if(!/@/g.test(this.usernameModel)){
        status = false;
        errorText = '不包含@'
      }else {
        status = true ;
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if(!/^\w{1,6}$/g.test(this.passwordModel)){
        status = false;
        errorText = '密码不是1-6位'
      } else {
        status = true ;
        errorText = ''
      }
      if ( !this.passwordFlag){
        errorText='';
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods:{
    clickLogin () {
      if(!this.userErrors.status || !this.passwordErrors.status){
          alert('错误')
      }else{
        this.errorText = '';
        this.$http.get('http://localhost:3000/login')
        .then( (data) => {
          this.$emit('has-log',data.data)
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

</style>
