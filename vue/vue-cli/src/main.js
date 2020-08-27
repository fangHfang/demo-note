// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import ElementUI from 'element-ui'
import router from './router'
import Axios from '../plugin/axios'
import regular from '../plugin/regular'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.scss'
import '@/assets/element.js'
import pager from '@/components/pager.vue'
import personList from '@/components/personList.vue'
import salePerson from '@/components/salePerson.vue'
import choosePassenger from '@/components/choosePassenger.vue'
import addressShow from '@/components/addressShow.vue'
import Print from 'vue-print-nb'
// import BaiDuMap from 'vue-baidu-map'
Vue.use(ElementUI)
Vue.use(Print)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$regular = regular
Vue.prototype.$store = store
Vue.component('pager', pager)
Vue.component('personList', personList)
Vue.component('salePerson', salePerson)
Vue.component('choosePassenger', choosePassenger)
Vue.component('addressShow', addressShow)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
