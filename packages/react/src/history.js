import { createBrowserHistory } from 'history'

// 组件有多种打包方式，这里采用懒实例化的方式

let history = null
function createHistory(basename = '/') {
  const history = createBrowserHistory({
    basename,
  })
  history.listen(() => {
    // Toast.hide()
    window.scrollTo(0, 0)
  })
  return history
}

function proxyFn(fn) {
  return function (...args) {
    return getHistory()[fn](...args)
  }
}

export function getHistory(basename) {
  if (!history) {
    history = createHistory(basename)
  }
  return history
}

export default {
  push: proxyFn('push'),
  replace: proxyFn('replace'),
  go: proxyFn('go'),
  goBack: proxyFn('goBack'),
  goForward: proxyFn('goForward'),
  listen: proxyFn('listen'),
}
