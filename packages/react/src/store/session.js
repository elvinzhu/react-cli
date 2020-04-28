
export default {
  get(key) {
    try {
      return JSON.parse(window.sessionStorage.getItem(key))
    } catch (err) { }
  },
  set(key, data) {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
}
