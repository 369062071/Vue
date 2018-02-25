import axios from 'axios'

const PAGE_START = 1

axios.defaults.timeout = 60000 //    响应时间

axios.defaults.headers = {
  'Accept': 'application/json;charset=utf-8',
  'Content-Type': 'application/json;charset=utf-8'
}

// axios.defaults.baseURL = ''   //  配置测试接口地址

// 获取分类数据
export function getCategorize (page, cid, sort) {
  const url = '/shop/categorize'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 产品列表数据
export function shopInfo (page, cid, sort) {
  const url = '/shop/info'

  const data = {
    page: page || PAGE_START,
    cid: cid,
    sort: sort
  }

  return axios.get(url, {
    params: data
  }).then(res => {
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
