'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://192.168.253.235:8888/API/"',
  // BASE_URL: '"http://192.168.253.222:8888/API/"',
  // DOWN_URL: '"http://192.168.253.222:8088/"'
  DOWN_URL: '"http://192.168.253.235:8088/"'
})

