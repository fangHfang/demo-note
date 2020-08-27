<template>
  <div class="news-index">
    <ul class="header">
      <li>
        <label>关键字</label>
        <el-input style="width: 235px" v-model="title" placeholder="政务信息关键字"></el-input>
      </li>
      <li>
        <el-button type="warning" size="small" class="warning-btn search-btn" @click="getList">搜索</el-button>
      </li>
    </ul>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="17">
          <ul class="content-left">
            <li v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
              <div class="infomation">
                <p>{{item.Title}}</p>
                <p>{{item.Jianjie}}</p>
              </div>
              <div class="time">
                <i class="el-icon-time"></i>
                {{item.AddTime}}
              </div>
            </li>
          </ul>
          <pager :pager="pager" @changePage="changePage"></pager>
        </el-col>
        <el-col :span="7">
          <div class="notice">
            <p class="title">热门</p>
            <ul class="hotList">
              <li v-for="(item, index) in reMenList" :key="index" class="text-over-hidden" @click="toDetail(item)">
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
import serverHttp from '@/assets/common/zhengwu'
export default {
  name: 'index',
  data () {
    return {
      title: '',
      listData: [],
      pager: {page: 1, total: ''},
      reMenList: [],
      siteLanMuId: ''
    }
  },
  methods: {
    /**
     * 分页
     * @param val
     */
    changePage (val) {
      this.pager.page = val
      this.getList()
    },
    /**
     * 跳转热门文章详情
     * @param item
     */
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'zhengwuDetail', query: {id: item.Id, siteLanMuId: this.$route.query.id}})
      window.open(routeData.href, '_blank')
    },
    // 获取列表
    getList () {
      let Title = this.title
      let Page = this.pager.page
      serverHttp.GetListPage({siteLanMuId: this.siteLanMuId, Title, Page}).then(res => {
        this.pager.pageSize = res.data.PageSize
        this.pager.total = res.data.Count
        this.listData = res.data.List
      })
    },
    // 获取热门列表
    getReMenList () {
      serverHttp.GetListForReMen({siteLanMuId: this.siteLanMuId}).then(res => {
        this.reMenList = res.data
      })
    }
  },
  mounted () {
    this.siteLanMuId = this.$route.query.id
    this.getList()
    this.getReMenList()
  },
  watch: {
    '$route' (val) {
      this.siteLanMuId = val.query.id
      this.getList()
      this.getReMenList()
    }
  }
}
</script>

<style lang="scss">
  .news{
    background: #fff;
  }
  $red: #ec5353;
.news-index{
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
      border-top: 1px solid #e5e5e5;
      li{
        border-bottom: 1px solid #e5e5e5;
        height: 103px;
        padding: 15px;
        position: relative;
        .infomation{
          width: 100%;
          p{
            font-size: 14px;
            color: #a1a8ac;
            line-height: 28px;
          }
          p:first-child{
            color: #222;
            font-size: 16px;
            margin-bottom: 6px;
          }
        }
        .time{
          width: 100%;
          height: 28px;
          text-align: right;
          line-height: 28px;
          color: #999;
          font-size: 14px;
          .el-icon-time{
            font-size: 16px;
          }
        }
        &:hover{
          background: #f9f9f9;
          .infomation{
            p:first-child{
              color: $red;
              cursor: pointer;
            }
          }
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
