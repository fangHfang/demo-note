'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"http://192.168.253.9:1001/appapi"',
  DOWN_URL: '"http://192.168.253.235:8088/"'
})
