/* eslint-disable indent */
/* jshint esversion: 6 */
import axios from 'axios'
// import qs from 'qs'
// import router from '@/router/index'
// 创建axios实例
console.log(process)
axios.defaults.baseURL = process.env.BASE_URL
    // 添加request拦截器
axios.interceptors.request.use(
        config => {
            if (localStorage.getItem('token')) {
                config.headers = {
                    'Content-Type': 'application/json;charset=utf-8',
                    'common': {
                        'token': localStorage.getItem('token')
                    }
                }
            } else {
                config.headers = {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )
    // 添加respone拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
const http = {
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            // data['SiteUrl'] = 'zhongao.com'
            axios.post(url, data)
                .then(response => {
                    resolve(response.data)
                }, err => {
                    reject(err)
                })
        })
    },
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            // params['SiteUrl'] = 'zhongao.com'
            axios.get(url, {
                    params: params
                })
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
export default http