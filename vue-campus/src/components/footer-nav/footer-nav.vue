<template>
  <div class="container">
    <ul class="link-list">
      <li class="link-item">
          <a href="javascript:;">
              <i class="icon icon-home"></i>
              <span>首页</span>
          </a>
      </li>
      <li class="link-item">
          <a href="javascript:;">
              <i class="icon icon-ticket"></i>
              <span>找券</span>
          </a>
      </li>
      <li class="link-item">
          <a href="javascript:;">
              <i class="icon icon-make-money"></i>
              <span style="color:#F43235">赚钱</span>
          </a>
      </li>
      <li class="link-item">
          <a href="javascript:;">
              <i class="icon icon-mine"></i>
              <span>我的</span>
          </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: .06rem 0;
  background: #fff;
}
.link-list{
    font-size: 0;
}
.link-item{
    display: inline-block;
    width: 25%;
    text-align: center;
    font-size: .12rem   ;
}
.link-item a{
    display: block;
    color: #888;
}
.icon{
    display: block;
    width: .2rem;
    height: .2rem;
    margin: 0 auto .06rem;
}
.icon-home{
    background: url(http://oss2.lanlanlife.com/8747f3bed057f3904efc8d6cc3330ec5_38x38.png);
    background-size: .2rem;
}

.icon-ticket{
    background: url(http://oss2.lanlanlife.com/54726826633e5a58cbd4a42ca0185fb3_38x38.png);
    background-size: .2rem;
}

.icon-make-money{
    background: url(http://oss.lanlanlife.com/1fd40ecf195531b47b11fdbf1ff0b20a_73x39.png);
    background-size: .2rem;
}

.icon-mine{
    background: url(http://oss1.lanlanlife.com/56b6d308773ca67c8a1ebf7fc15570bc_38x36.png);
    background-size: .2rem;
}
@media screen and (min-width: 413px) {
    .icon-home{
        background: url(http://oss2.lanlanlife.com/dddc5682d61f7c967c608f429e380532_57x57.png);
        background-size: .2rem;
    }
    .icon-ticket{
        background: url(http://oss.lanlanlife.com/413297ee66cfd89061b573903a9cdd64_57x57.png);
        background-size: .2rem;
    }
    .icon-make-money{
        background: url(http://oss2.lanlanlife.com/99357c2dbe5bcfb14bf60ed94159b79a_110x59.png);
        background-size: .2rem;
    }
    .icon-mine{
        background: url(http://oss1.lanlanlife.com/65c22299c2f3fceb2c94544c5185d93b_57x54.png);
        background-size: .2rem;
    }
}
</style>
