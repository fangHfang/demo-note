import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    banner: [],
    userInfo: [],
    tourInfo: '',
    siteImgs: [],
    siteInfo: {}
  },
  mutations: {
    setBanner (state, data) {
      state.banner = data
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setTourInfo (state, data) {
      state.tourInfo = data
    },
    setSiteImgs (state, data) {
      state.siteImgs = data
    },
    setSiteInfo (state, data) {
      state.siteInfo = data
    }
  }
})
export default store
