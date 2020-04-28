const CacheItems = {
  __counter: 0,
  __items: {},
  __requests: {},
  getNewKey() {
    return 'cache_' + ++this.__counter
  },
  set(key, data) {
    this.__items[key] = JSON.stringify(data);
    delete this.__requests[key];
  },
  get(key) {
    return JSON.parse(this.__items[key])
  },
  has(key) {
    return key in this.__items;
  },
  getRequest(key) {
    return this.__requests[key];
  },
  setRequest(key, req) {
    this.__requests[key] = req;
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
    const req = CacheItems.getRequest(cacheKey) ||
      fn.apply(this, arguments).then(res => {
        if (res.success) {
          CacheItems.set(cacheKey, res);
          // always return a copy considering concurrent request
          return CacheItems.get(cacheKey);
        }
        return res;
      })
    CacheItems.setRequest(cacheKey, req);
    return req;
  }
}
