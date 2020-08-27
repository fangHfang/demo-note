<template>
  <div class="guide-index">
    <ul class="header">
      <li>
        <label>出发地区</label>
        <cityList></cityList>
      </li>
      <li>
        <label>目的地</label>
        <cityList></cityList>
      </li>
      <li>
        <label>关键字</label>
        <el-input style="width: 235px" v-model="input" placeholder="攻略关键字"></el-input>
      </li>
      <li>
        <el-button type="warning" size="small" class="warning-btn search-btn" @click="getGongLueList">搜索</el-button>
      </li>
    </ul>
    <div class="content" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="17">
          <ul class="content-left">
            <li v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
              <img src="/static/default.gif" alt="">
              <div class="infomation">
                <p>{{item.Title}}</p>
                <p><i>出发地区: {{item.type}}</i> <i>出发时间: {{item.LastTime}}</i> <i>旅游天数: {{item.type}}</i> <i>出游人数: {{item.type}}</i></p>
              </div>
            </li>
          </ul>
          <pager :pager="pager" @changePage="changePage"></pager>
        </el-col>
        <el-col :span="7">
          <div class="notice">
            <p class="title">热门</p>
            <ul class="hotList">
              <li v-for="(item, index) in reMenlistData" :key="index" class="text-over-hidden" @click="toDetail(item)">
                <i>{{index+1}}</i>
                {{item.Title}}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/gonglue'
import cityList from '@/components/cityZiYing'
export default {
  name: 'index',
  components: {cityList},
  data () {
    return {
      input: '',
      listData: [],
      reMenlistData: [],
      pager: {
        page: 1,
        total: ''
      },
      siteLanMuId: '',
      loading: false
    }
  },
  mounted () {
    this.siteLanMuId = this.$route.query.id
    this.getGongLueList()
    this.getReMenList()
  },
  methods: {
    getGongLueList () {
      this.loading = true
      let SiteLanMuId = this.siteLanMuId
      let Page = this.pager.page
      let Title = this.input
      serverHttp.GetListPage({SiteLanMuId, Page, Title}).then(res => {
        this.loading = false
        this.listData = res.data.List
        this.pager.total = res.data.Count
      })
    },
    getReMenList () {
      let SiteLanMuId = this.siteLanMuId
      serverHttp.GetListForReMen({SiteLanMuId}).then(res => {
        this.reMenlistData = res.data
      })
    },
    /**
     * 分页
     * @param val
     */
    changePage (val) {
      this.pager.page = val
      this.getGongLueList()
    },
    /**
     * 跳转热门文章详情
     * @param item
     */
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'guideDetail', query: {id: item.Id, siteLanMuId: this.siteLanMuId}})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="scss">
  $red: #ec5353;
.guide-index{
  padding-top: 20px;
  .header {
    padding: 10px 20px;
    height: 55px;
    margin: 0 0 20px;
    line-height: 35px;
    background: #fbf0e3;
    border: 1px solid #f9dab8;
    box-sizing: border-box;
    li{
      float: left;
      margin-right: 30px;

        .el-input__icon {
          height: 31px;
          line-height: 31px;
        }

      .el-input{
        width: 122px;
        height: 31px;
        margin-left: 10px;
        .el-input__inner {
          height: 31px;
          &:focus{
            border-color: #3aa400;
          }
        }
      }
      .el-date-editor{
        width: 150px;
        height: 31px;
        margin-left: 10px;
        .el-input__inner{
          height: 31px;
        }
        .el-input__icon{
          line-height: 31px;
        }
      }

      .search-btn{
        padding: 6px 15px;
      }
    }
  }
  .content{
    overflow: hidden;
    .content-left{
      li{
        border-bottom: 1px solid #e5e5e5;
        height: 103px;
        padding: 15px;
        position: relative;
        img{
          width: 150px;
          height: 100px;
          margin-right: 20px;
          float: left;
        }
        .infomation{
          width: calc(100% - 170px);
          margin-left: 170px;
          p{
            font-size: 14px;
            color: #666;
            line-height: 28px;
            i{
              margin-right: 15px;
            }
          }
          p:first-child{
            color: #222;
            font-size: 16px;
            height: 50px;
            margin-bottom: 6px;
            cursor: pointer;
            &:hover{
              color: $red;
            }
          }
        }
        &:hover{
          background: #f9f9f9;
        }
      }
    }
    .notice{
      background: #fafafa;
      padding-top: 20px;
      margin-bottom: 20px;
      .title{
        margin-bottom: 5px;
        font-size: 20px;
        border-left: 4px solid $red;
        padding-left: 10px;
      }
      .typeList{
        padding: 9px 12px 11px;
        overflow: hidden;
        li{
          width: 50%;
          height: 33px;
          margin-bottom: 5px;
          text-align: center;
          line-height: 33px;
          font-size: 16px;
          color: #333;
          cursor: pointer;
          float: left;
          box-sizing: border-box;
          &:hover{
            color: $red;
          }
        }
        li:nth-child(2n+1){
          border-right: 1px solid #ccc;
        }
        .activeType{
          color: $red;
        }
      }
      .hotList{
        padding: 9px 12px 11px;
        li{
          height: 18px;
          line-height: 18px;
          margin: 7px 0 12px;
          font-size: 14px;
          letter-spacing: 0.5px;
          i{
            background: $red;
            border-color: $red;
            color: #fff;
            display: inline-block;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            font-size: 12px;
            margin-right: 8px;
          }
          &:hover{
            color: $red;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
