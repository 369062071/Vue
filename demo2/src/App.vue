<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    
   <keep-alive>
      <router-view :seller="seller"></router-view>
   </keep-alive>
   
    
  </div>
</template>

<script>
  import VHeader from "./components/header/header.vue"
  import Goods from './components/goods/goods.vue'
  import {urlParse} from './common/js/until'

export default {
  components:{
      VHeader,
      Goods
  },
  data () {
      return {
          seller:{
            id:(() => {
              let queryParam = urlParse();
              console.log(queryParam);
              return queryParam.id; 
            })()
          }

      }
  },
  created () {
    // 获取header内容
    this.axios.get('src/common/data.json?id='+this.seller.id)
    .then( (res) => {
      this.seller = Object.assign({},res.data.seller, this.seller)
      console.log(this.seller.id)
    })
  }

}
</script>

<style  scoped>
   .tab{
        display :flex;
        width: 100%;
        height :40px;
        line-height : 40px;
        position: relative;
   }
   .tab:after{
       display: block;
       content: '';
       position: absolute;
       left:0;
       bottom: 0;
       width: 100%;
       border-top: 1px solid #eee;
   }
   .tab-item{
        flex: 1px;
        text-align:center;
    }
   .tab-item a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
   }
   .tab-item a.active{
       color: rgb(240,20,20);
   }



</style>
