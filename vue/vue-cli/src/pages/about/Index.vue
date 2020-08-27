<template>
    <div class="about-index">
        <p class="title"><span>关于我们</span></p>
        <ul class="list-parent" v-loading="loading">
          <li class="list-item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
              <span class="text-over-hidden">{{item.Title}}</span>
              <span>{{item.LastTime}}</span>
          </li>
        </ul>
      <pager :pager="pager" @changePage="changePage"></pager>
    </div>
</template>

<script>
import serverHttp from '@/assets/common/about'
export default {
  name: 'index',
  data () {
    return {
      listData: [],
      pager: {
        page: 1,
        total: ''
      },
      siteLanMuId: '',
      loading: false,
      typeId: ''
    }
  },
  mounted () {
    this.siteLanMuId = this.$route.query.id
    this.getAboutList()
  },
  watch: {
    '$route' (val) {
      console.log(val.query.typeId)
      this.typeId = val.query.typeId
      this.getAboutList()
    }
  },
  methods: {
    getAboutList () {
      this.loading = true
      let SiteLanMuId = this.siteLanMuId
      let Page = this.pager.page
      let TypeId = this.typeId
      serverHttp.GetListPage({SiteLanMuId, Page, TypeId}).then(res => {
        this.loading = false
        this.listData = res.data.List
        this.pager.total = res.data.Count
      })
    },
    /**
     * 跳转详情
     * @param item
     */
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'aboutDetail', query: {id: item.Id, siteLanMuId: this.siteLanMuId, index: this.$route.query.index, isclick: 0}})
      window.open(routeData.href, '_blank')
    },
    /**
     * 分页
     */
    changePage (e) {
      this.pager.page = e
      this.getAboutList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .about-index {
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
      .list-parent{
        margin: 20px 0;
        .list-item{
          width: 100%;
          overflow: hidden;
          line-height: 30px;
          span:first-child{
            width: 87%;
            float: left;
            box-sizing: border-box;
            padding-left: 15px;
            font-size: 14px;
            position: relative;
            cursor: pointer;
            &::before{
              width: 4px;
              height: 4px;
              content: "";
              position: absolute;
              left: 0;
              top: 40%;
              background: #ec5353;
            }
            &:hover{
              color: #ec5353;
            }
          }
          span:last-child{
            width: 13%;
            float: right;
            text-align: right;
            color: #333;
          }
        }
      }
  }
  .text-over-hidden{
    width: 85% !important;
  }
  .about-index .list-parent .list-item span:last-child{
    width: 15% !important;
  }
</style>
