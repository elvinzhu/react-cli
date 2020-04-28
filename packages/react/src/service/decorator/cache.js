const CacheItems = {
  __counter: 0,
  __items: {},
  getNewKey() {
    return 'cache_' + ++this.__counter
  },
  set(key, data) {
    this.__items[key] = JSON.stringify(data)
  },
  get(key) {
    return JSON.parse(this.__items[key])
  },
  has(key) {
    return key in this.__items;
  }
};

export default function withCache(fn) {
  let cacheKey = CacheItems.getNewKey();
  return function () {
    if (CacheItems.has(cacheKey)) {
      // eslint-disable-next-line
      console.log(fn.name, ': using cache')
      return Promise.resolve(CacheItems.get(cacheKey))
    }
    return fn.apply(this, arguments).then(res => {
      if (res.success) {
        CacheItems.set(cacheKey, res)
      }
      return res;
    })
  }
}
