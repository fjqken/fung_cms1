/**
 * 封装 axios
 */
import axios from "axios";
import {ElMessage} from 'element-plus'
import {ElLoading} from 'element-plus'

// import Config from '@/config'
// import router from '@/router'
let isOnLine = true;  // 网络是否在线

window.addEventListener('offline', function () {
    ElMessage.error('网络似乎断线了,请检查网络是否正常');
    isOnLine = false;
});

window.addEventListener('online', function () {
    isOnLine = true;
});

let loading = '';

function showLoading() {
    loading = ElLoading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)',
        fullscreen: true
    });
}

function hideLoading() {
    loading.close();
}

const config = {
    // baseURL: Config.baseURL || '',
    // baseURL: 'https://workbench.xdeas.com.cn',
    timeout: 5 * 1000, // 请求超时时间设置
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'session-id': '111',
        'role': 'app_v2Admin'
    },
    // withCredentials: true, // Check cross-site Access-Control
    // 定义可获得的http响应状态码
    // return true、设置为null或者undefined，promise将resolved,否则将rejected
    validateStatus(status) {
        return status >= 200 && status < 510
    },
}

// /**
//  * 错误码是否是refresh相关
//  * @param { number } code 错误码
//  */
// function refreshTokenException(code) {
//     const codes = [10000, 10042, 10050, 10052, 10012]
//     return codes.includes(code)
// }

// 创建请求实例
const _axios = axios.create(config)

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
    return _axios({
        method: 'post',
        url,
        data,
        params,
    })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
    return _axios({
        method: 'get',
        url,
        params,
    })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
    return _axios({
        method: 'put',
        url,
        params,
        data,
    })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
    return _axios({
        method: 'delete',
        url,
        params,
    })
}

export function push() {
    window.location.href = '/'
}

_axios.interceptors.request.use(config => {
        if (!isOnLine) {
            ElMessage.error('网络似乎断线了,请检查网络是否正常');
        }
        showLoading()
        //如果已存在sessionId，则所有请求携带该sessionId
        console.log(localStorage.getItem('session-id'))
        if (localStorage.getItem('session-id')) {
            config.headers['session-id'] = localStorage.getItem('session-id')
        }
        return config
    }
)

_axios.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    // ElMessage.success(response.data.state.toString())
    hideLoading()
    return response

}, error => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = error.response.data.state.toString()
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = 'token验证失败'
                setTimeout(push, 2000);
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            ElMessage.error('服务器响应超时，请刷新当前页')
        }
        error.message('连接服务器失败')
    }

    ElMessage.error(error.message)
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
})

export default _axios
