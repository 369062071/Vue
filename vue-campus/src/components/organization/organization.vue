<template>
    <div class="organization-model">
      <head-title :title="title"></head-title>
      <div class="main">
        <form @submit.prevent="submit">
          <div class="input-box box-shadow">
              <input type="text" v-model.trim="formData.school" @blur="checkSchool" @focus="emptyHintMsg"
               placeholder="学校">
          </div>
          <div class="input-box box-shadow">
              <input type="text" v-model.trim="formData.organization"
              @blur="checkOrganization" @focus="emptyHintMsg" placeholder="机构名称">
          </div>
          <div class="input-box box-shadow">
              <input type="text" v-model.trim="formData.headName"
              @blur="checkHeadName" @focus="emptyHintMsg" placeholder="负责人姓名">
          </div>
          <div class="input-box box-shadow">
              <input type="number" v-model.trim="formData.phone"
               @blur="checkPhone" @focus="emptyHintMsg" placeholder="请输入手机号码">
          </div>

          <div class="input-box ">
            <div class="box-shadow flex-wrap">
              <input type="text" v-model.trim="formData.shortMsg"
             @blur="checkShortMsg" @focus="emptyHintMsg"  class="short-msg" placeholder="短信验证码">
            </div>
            <button type="button" class="btn-send" @click="sendMsg">
              <span v-show="isShow">发送</span>
              <span v-show="!isShow" class="disable">{{ count }}</span>
            </button>
          </div>

          <div class="input-box box-shadow">
              <input type="text" v-model.trim="formData.command"
               @blur="checkCommand" @focus="emptyHintMsg"
               class="command" placeholder="我的省钱口令">
          </div>
          <div class="input-box box-shadow">
              <input type="text" v-model.trim="formData.invitatoryCommand"
               @foucus="emptyHintMsg" class="invitatory-command" placeholder="邀请人的省钱口令（选填）">
          </div>
          <div class="select-box input-box">
              <span class="nowrap">上传审核资料：</span>
              <select v-model.trim="formData.prove" class="select-prove">
                  <option value="1">聘任书</option>
                  <option value="2">团委盖章证明</option>
                  <option value="3">其他审核材料</option>
              </select>
          </div>

          <div class="item-input relative">
            <div class="upload-wrapper">
              <input class="u-upload"

                name="drivingLicence"
                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                type="file">

              <div class="line-wrapper">
                <i class="line line-x"></i>
                <i class="line line-y"></i>
              </div>
              <div class="img-container" id="container"></div>
            </div>
          </div>
          <!-- 提示 -->
          <p class="hint">{{ hintMsg }}</p>
           <button type="submit" class="btn-submit">申请</button>
        </form>
      </div>
    </div>
</template>

<script>
import HeadTitle from '../head-title/headTitle'

const TIME_COUNT = 3

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      title: '机构报名表',
      isShow: true,
      timer: null,
      count: null,
      formData: {
        prove: 1
      },
      hintMsg: null
    }
  },
  methods: {
    checkSchool () {
      if (this.formData.school === void 0) {
        this.hintMsg = '请输入您的学校'
        return false
      }
      return true
    },
    checkOrganization () {
      if (this.formData.organization === void 0) {
        this.hintMsg = '请输入您的机构名称'
        return false
      }
      return true
    },
    checkHeadName () {
      if (this.formData.headName === void 0) {
        this.hintMsg = '请输入您的负责人姓名'
        return false
      }
      return true
    },
    checkPhone () {
      if (this.formData.phone === void 0) {
        this.hintMsg = '请输入您的手机号码'
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.formData.phone))) {
        this.hintMsg = '手机号码格式不正确'
        return false
      }

      return true
    },
    checkShortMsg () {
      if (this.formData.shortMsg === void 0) {
        this.hintMsg = '请输入您的短信验证码'
        return false
      }
      return true
    },
    checkCommand () {
      if (this.formData.command === void 0) {
        this.hintMsg = '请输入您的省钱口令'
        return false
      }
      return true
    },
    emptyHintMsg () {
      this.hintMsg = ''
    },
    sendMsg () {
      if (!this.checkPhone()) {
        return false
      }
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isShow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.isShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    submit () {
      if (!this.checkData()) {
        console.log('验证失败')
        return false
      }
      console.log(this.formData, '验证通过')
    },
    checkData () {
      if (this.checkSchool() && this.checkOrganization() && this.checkHeadName() && this.checkPhone() && this.checkShortMsg() && this.checkCommand()) {
        return true
      }
      return false
    }
  },
  computed: {

  }
}
</script>

<style>
.organization-model{
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
  .main{
    flex-grow: 1;
    width: 100%;
    padding: .18rem .35rem 0;
    box-sizing: border-box;
    background: #f6f6f6;
  }
  .input-box{
    display: flex;
    margin-bottom: .12rem;
    border-radius: 5px;
    font-size: .14rem;
    color: #333;
  }
  .input-box input{
    width: 100%;
    padding: .1rem .15rem;
    box-sizing: border-box;
    line-height: .21rem;
    border: none;
    border-radius: 5px;
  }
  .btn-send{
    width: 1rem;
    flex: 0 0 1rem;
    margin-left: .08rem;
    border: none;
    border-radius: 5px;
    font-size: .14rem;
    color: #fff;
    background: #F6704F;
  }
  .select-prove{
    flex-grow: 1;
    padding: .1rem .15rem;
    box-shadow: 0 0 10px rgba(35, 22, 19, 0.14);
  }
  .select-box{
    align-items: center;
    padding-left: .15rem;
  }
  .nowrap{
    white-space: nowrap;
  }
  .disable{
    opacity: .6;
  }
  .btn-submit{
    width: 100%;
    padding: .16rem 0 .14rem;
    border-radius: 22px;
    border: none;
    font-size: .14rem;
    color: #fff;
    background: #F6704F;
}
  .upload-wrapper{
    width: .8rem;
    height: .8rem;
    position: relative;
    /* overflow: hidden;  */
}
.line-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
}
.line{
    display: block;
    background: #DCDCDC;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.line-x{
    width: .6rem;
    height: 2px;
}
.line-y{
    width: 2px;
    height: .6rem;
}
.u-upload{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 0;
}
.img-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* background: #F6F6F6; */
}
.m-prove{
    display: flex;
    align-items: center;
}
.img-container img{
    width: 100%;
    height: 100%;
}
.hint {
    text-align: center;
    padding-bottom: .12rem;
    font-size: 0.12rem;
    color: #FF0000;
}
.flex-wrap {
  flex-grow: 1;
}
@media screen and (max-width: 321px) {
    .g-main {
        padding: .18rem .35rem 0;
    }
}
</style>
