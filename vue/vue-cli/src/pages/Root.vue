<template>
<div class="Root" v-loading="loading">
  <Header type="2" :data="imgs"></Header>
  <NavList :data="lanMu"></NavList>
  <router-view/>
  <Footer :data="siteInfo"></Footer>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import NavList from '@/components/NavList.vue'
import Footer from '@/components/Footer.vue'
import serveHttp from '@/assets/common/index'
export default {
  name: 'Root',
  components: {Header, NavList, Footer},
  data () {
    return {
      lanMu: [],
      loading: false,
      siteInfo: {},
      imgs: []
    }
  },
  created () {
    this.getSiteList()
  },
  methods: {
    async getSiteList () {
      let res = await serveHttp.SiteInfo({})
      if (res.code === 0) {
        res.data.daohang.splice(8, 0, {Action: 'contract', ChildItems: [], Id: '770ec27059314add9b61d456456803a28c', Controller: 'contract', HasChild: false, IsMuLu: 0, LinkUrl: '', Name: '合同'})
        res.data.daohang.splice(10, 0, {Action: 'invoice', ChildItems: [], Id: '770ec27059314add9b61d456456804588c', Controller: 'invoice', HasChild: false, IsMuLu: 0, LinkUrl: '', Name: '发票'})
        this.lanMu = res.data.daohang
        this.imgs = res.data.sitetoppic
        if (this.imgs.length === 0) {
          this.imgs = [{PicturePath: '/static/default.gif'}, {PicturePath: '/static/default.gif'}, {PicturePath: '/static/default.gif'}]
        }
        if (this.imgs.length === 1) {
          this.imgs = this.imgs.concat([{PicturePath: '/static/default.gif'}, {PicturePath: '/static/default.gif'}])
        }
        if (this.imgs.length === 2) {
          this.imgs = this.imgs.concat([{PicturePath: '/static/default.gif'}])
        }
        this.siteInfo = res.data.site
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
