export default {
  log() {
    // TODO: DO NOT log when production
    console.log.call(console, '[H5]', ...arguments)
  }
}
