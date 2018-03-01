import axios from 'axios'
import qs from 'qs'

const PAGE_START = 1

axios.defaults.timeout = 60000 //    响应时间

axios.defaults.baseURL = 'http://192.168.1.109:3200' //  配置测试接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化
      config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
      config.url = config.url + '?' + config.data
      console.log(config)
    }
    return config
  }
)

// 获取分类数据
export function getCategorize (page, cid, sort) {
  const url = '/shop/categorize'

  return axios.post(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 产品列表数据
export function getItemVo (page, cid, sort) {
  const url = '/ecommerce/web/getItemVo'

  const data = {
    page: page || PAGE_START,
    cid: cid,
    sort: sort
  }

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}

// 获取单个banner
export function getsinglebanner (id) {
  const url = '/ecommerce/management/getsinglebanner'

  const data = {
    id: id
  }
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

// 搜索数据
export function search (query, page) {
  const url = '/shop/info'

  const data = {
    page: page || PAGE_START,
    query: query
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 跑马灯文字
export function marquee () {
  const url = '/user/marquee'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
