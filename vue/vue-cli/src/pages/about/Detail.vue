<template>
  <div class="about-detail">
    <div>
      <p class="title"><span>{{info.Title}}</span></p>
      <div class="content">
        <div v-html="info.NeiRong"></div>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/about'
export default {
  name: 'Detail',
  data () {
    return {
      info: {},
      siteLanMuId: '',
      aboutId: ''
    }
  },
  mounted () {
    this.siteLanMuId = this.$route.query.siteLanMuId
    this.aboutId = this.$route.query.id
    this.getAboutDetail()
  },
  methods: {
    getAboutDetail () {
      let SiteLanMuId = this.siteLanMuId
      let Id = this.aboutId
      serverHttp.GetDetail({SiteLanMuId, Id}).then(res => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .about-detail {
    .title{
      border-bottom: 2px solid #e5e5e5;
      padding-bottom: 5px;
      font-size: 22px;
      span{
        display: inline-block;
        margin-bottom: -7px;
        padding: 0 15px 5px 15px;
        border-bottom: 2px solid #029a3c;
      }
    }
    .content{
      line-height: 28px;
      margin: 20px 0;
      color: #333;
      p{
        text-indent: 10px;
      }
    }
  }
</style>
