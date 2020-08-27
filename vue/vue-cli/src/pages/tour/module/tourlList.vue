<template>
  <div class="tour-list">
    <el-row>
        <el-col class="card" :span="24" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <router-link to='detail' class="imagebox" target=_blank>
              <img src="/static/default.gif" class="image">
              <span class="tag">{{tag}}</span>
            </router-link>
            <div class="ProductInfo">
              <h3>
                <router-link class="title" to='' :title="text" target=_blank>{{text}}</router-link>
              </h3>
              <div class="ZhuTi clearfix">
                  <span v-for="value in zhuti" :key="value">{{value}}</span>
              </div>
              <dl class="clearfix fatuanDate">
                  <dt>发团日期</dt>
                  <dd class="tuanqi"></dd>
                  <dd><router-link to='' class="date">查看团期</router-link></dd>
              </dl>
            </div>
            <div class="ProductWrap">
              <div class="ProductPrice">
                  <span>￥<strong style="font-size: 30px;">1200</strong></span>起
              </div>
              <el-link class="ProductBtn" href="#/xianlu/detail" target="_blank">查看详情</el-link>
              <p><em>100%</em>满意度</p>
            </div>
          </el-card>
        </el-col>
        <el-col style="width: 100%;overflow: hidden;" :span="24">
          <pager :pager="pager" @changePage="changePage" style="margin:20px 100px"></pager>
        </el-col>
      </el-row>
      <div class="MainTips fr">
        <div class="MainTipsItem HotDestination">
            <h3>热门目的地</h3>
            <ul class="clearfix">
              <li><router-link to=''>太原</router-link></li>
            </ul>
        </div>
      </div>
      <div class="clear"></div>
  </div>
</template>
<script>
import pager from '@/components/pager'
// import serverHttp from '@/assets/common/tour'
export default {
  components: {pager},
  data () {
    return {
      tag: '太原出发',
      text: '【国内游】太原+大同-1天1夜-测试分销商线路001+LY17-001',
      zhuti: ['邮轮旅游', '常规旅游', '毕业游'],
      pager: {
        pageSize: 10,
        page: 1,
        total: 200
      },
      listData: []
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    changePage (val) {
      this.pager.page = val
    },
    getList () {
      // serverHttp.productList().then(res => {
      //   if (res.code === 0) {
      //     this.listData = res.data.List
      //     this.pager.total = res.data.Count
      //     this.pager.page = res.data.Index
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.tour-list{
  .el-row{
    width: 930px;
    float: left;
  }
  .clear{
    clear:both
  }
  .card{
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    transition: all .2s ease-in-out;
    .imagebox{
      position: relative;
      display: block;
      padding: 20px;
      float: left;
      img{
        width: 212px;
        height: 130px;
      }
      .tag{
        position: absolute;
        left: 20px;
        top: 20px;
        display: inline-block;
        padding: 0 10px;
        height: 23px;
        line-height: 23px;
        background: #ffb536;
        color: #fff;
      }
    }
    .ProductInfo{
      float: left;
      padding: 20px 20px 20px 0;
      width: 493px;
      h3 >>> .title{
        color: #333;
        font-size: 16px;
        font-family: "微软雅黑",tahoma,'宋体',Arial,Lucida,Verdana,Helvetica,sans-serif;
        font-weight: 100;
      }
      .ZhuTi{
        margin: 7px 0 -8px;
        span{
          padding: 0 3px;
          margin-bottom: 9px;
          margin-right: 6px;
          color: #f63;
          border: 1px solid #f63;
          border-radius: 3px;
        }
      }
      dl{
        margin-top: 15px;
        height: 22px;
        line-height: 22px;
        dt{
          float: left;
          width: 65px;
          color: #aaa;
          dd{
            position: relative;
            display: inline-block;
            height: 22px;
            line-height: 22px;
            color: #666;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
      dd >>> .date{
        color: #f60;
      }
    }
    .ProductWrap{
      float: right;
      margin: 20px 0;
      width: 161px;
      text-align: center;
      .ProductPrice {
        margin: 10px 0 13px 0;
        height: 30px;
        line-height: 22px;
        color: #999;
        font-size: 14px;
        span{
          margin-right: 5px;
          color: #f60;
          font-size: 18px;
        }
      }
      p{
        margin-top: 10px;
        margin-right: 25px;
        text-align: right;
        em{
          margin-right: 5px;
          color: #ff7800;
          font-size: 16px;
        }
      }
      >>> .ProductBtn{
        display: inline-block;
        padding: 0 25px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #ff7800;
        color: #fff;
        font-size: 16px;
        border-radius: 2px;
        outline:none;
      }
      >>> .ProductBtn:hover{
        text-decoration: none;
        border: 0;
        outline:none;
      }
    }
  }
  .card:hover{
    box-shadow: 0 0 16px 2px rgba(0,0,0,.2);
  }
  .MainTips {
    width: 250px;
    float: right;
    .MainTipsItem {
        margin-bottom: 20px;
        background-color: #fff;
      h3{
        padding-left: 15px;
        height: 36px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
      }
      ul{
        padding: 0 0 13px;
        overflow: hidden;
        li >>> a{
          float: left;
          margin-left: 13px;
          margin-top: 13px;
          padding: 0 5px;
          width: 56px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background-color: #eef4fa;
          color: #666;
          border-radius: 3px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        li >>> a:hover{
          background: #f60;
          color: #fff
        }
      }
    }
  }
}
</style>
