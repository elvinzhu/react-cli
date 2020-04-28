import { Toast } from 'zarm';
import axios from 'axios';
import _ from 'lodash';
import { toParam } from '../utils/tool';

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.method = 'POST';
axios.defaults.baseURL = process.env.PUBLIC_PATH;

axios.interceptors.request.use(function (config) {
  if (config.requestType == 'form') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.data = toParam(config.data)
  }
  return config;
})

axios.interceptors.response.use(res => {
  const data = res.data;
  // if (data && data.code === -100) {
  //   location.replace('/claim/login?backUrl=' + encodeURIComponent(window.location.href));
  //   logger.send({ type: 'loginexpired' })
  //   return Promise.reject({
  //     success: false,
  //     message: '未登录或者登陆失效，请重新登陆'
  //   })
  // }
  data.__raw = res;
  return data;
})

export default function request(url, options) {
  options.url = url;
  return axios(options).then(res => {
    // eslint-disable-next-line
    if (res.success === true) { }
    else if (options.failMuted !== true) {
      showFailMessage(res)
    }
    return res;
  }).catch(error => {
    if (options.errorMuted !== true && error) {
      showErrorMessage(error);
    }
    return Promise.reject(error)
  })
}

export function showErrorMessage(err) {
  let msg = '未知异常，请稍后再试';
  const { msg: message } = err;
  if (/Network Error/i.test(message)) {
    msg = '网络异常，请检查网络设置'
  }
  else if (/timeout/i.test(message)) {
    msg = '请求超时，请稍后再试'
  }
  else if (/Request failed with status code/i.test(message)) {
    msg = '系统异常'
  }
  else if (message) {
    msg = message
  }
  showFailMessage({ msg })
}

export function showFailMessage(res) {
  Toast.show(res.msg || '系统异常')
}
