<template>
  <div id="app">
    <div class="index">
      <router-view/>
      <el-backtop target="#app"></el-backtop>
    </div>
  </div>
</template>

<script>
import serveHttp from '@/assets/common/index'
export default {
  name: 'app',
  components: {},
  data () {
    return {
    }
  },
  created () {
    this.getSiteList()
  },
  methods: {
    async getSiteList () {
      let res = await serveHttp.SiteInfo({})
      console.log(res)
      if (res.code === 0) {
        this.$store.commit('setSiteImgs', res.data.sitetoppic)
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  background-color: #f6f6f6;
  .index {
    min-width: 1200px;
  }

  }
  body {
    background: #f6f6f6;
  }
</style>
