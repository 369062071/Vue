<template>
  <div class="singer">
    <list-view :data="singers" @select='selectSinger'></list-view>
    <!-- router-view 承载子路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import Singer from '../../common/js/singer'
  import ListView from '../../base/listview/listview.vue'
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {mapMutations} from 'vuex' // vuex 语法糖

  const HOT_NAME = '热门歌手'
  const HOT_SINGER_LEN = 10

  export default {
    components: {
      ListView
    },
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      // 接受ID 跳转路由
      selectSinger (singer) {
        console.log(singer.id)
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // 通过setSinger将数据传入
        this.setSinger(singer)
      },
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      //  数据处理，重新分类
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          // 提取前十个hot数据
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          // 创建key
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          // key.items添加数据
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 为了得到有序列表，需要处理 map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      // 对象映射,把对mutation的修改映射成一个方法名
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style lang="stylus" scoped>

  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
      
</style>


