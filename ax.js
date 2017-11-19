import axios from "axios";

import { Toast } from 'mint-ui'

import { Indicator } from 'mint-ui'


axios.defaults.timeout = 5000 // 响应时间

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头

axios.defaults.headers = {

    'X-Requested-With': 'XMLHttpRequest',

// "Accept": "application/json;charset=utf-8",

// "Content-Type": "application/json;charset=utf-8"

}

axios.defaults.baseURL = 'http://localhost:8081' // 配置接口地址


//POST传参序列化(添加请求拦截器)

axios.interceptors.request.use(

    config => {

// 在发送请求之前做某件事

        Indicator.open({

            text: 'Loading...',

            spinnerType: 'fading-circle'

        });

        if (

            config.method === "post" ||

            config.method === "put" ||

            config.method === "delete"

        ) {

// 序列化

            config.data = JSON.stringify(config.data);

        }

        console.log("发起网络请求,url 是: ",config.url," ,请求方法是: ",config.method,", 请求数据为: ",config.data)

        return config;

    },

    error => {

        Indicator.close();

        Toast({

            message: '请求错误',

            iconClass: 'icon icon-fail'

        });

        return Promise.reject(error);

    }

);


//返回状态判断(添加响应拦截器)

axios.interceptors.response.use(

    res => {

//对响应数据做些事

        if (res.data) {

            Indicator.close();

            return Promise.reject(res.data);

        }

        return res;

    },

    error => {

        Indicator.close();

        Toast({

            message: '网络错误',

            iconClass: 'icon icon-fail',

            duration:1500

        });

        return Promise.reject(error);

    }

);

// 返回一个Promise(发送get请求)

export function fetch (url) {

    return new Promise((resolve, reject) => {

        axios.get(url)

            .then(response => {

                resolve(response.data)

            }).catch((error) => {

            reject(error)

        })

    })

}

// 返回一个Promise(发送post请求)

export function post (url,params) {

    return new Promise((resolve, reject) => {

        axios.post(url,params)

            .then(response => {

                resolve(response.data)

            }).catch((error) => {

            reject(error)

        })

    })

}

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)

export default {

    text(){

        return fetch('/text')

    },

    login(params){

        return post('/user/login',params)

    }

}

module.exports  = {
    post:post
}