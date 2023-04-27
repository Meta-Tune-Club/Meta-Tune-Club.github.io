module.exports = {
    webpack(config) {
      delete config.node
      return config
    }
  }
  