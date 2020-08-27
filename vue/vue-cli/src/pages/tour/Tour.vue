<template>
  <div class="tour" v-loading="loading">
    <tour-search @search="search" :data="datalist.ChuFaCity"></tour-search>
    <mul-choice v-bind:datalist="datalist" :pager="pager" @choose="chooseFilter" @sort="sort"></mul-choice>
    <div class="tour-list">
      <el-row v-if="listData.length>0">
        <el-col class="card" :span="24" v-for="(item, index) in listData" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div class="imagebox" @click="toDetail('#/xianlu/detail', item.Id)">
              <img :src="item.Img" onerror="this.src = '/static/default.gif'" class="image">
              <span class="tag">{{item.ChuFaDi}}出发</span>
            </div>
            <div class="ProductInfo">
              <h3>
                <div class="title text-over-hidden2" :title="item.Title" @click="toDetail('#/xianlu/detail', item.Id)">{{item.Title}}</div>
              </h3>
              <div class="ZhuTi clearfix" :class="{second:item.GysCompanyId==''}">
                <span>{{item.XianLuLeiXing}}</span>
              </div>
              <dl class="clearfix gys" v-if="item.GysCompanyId">
                <dt>供<em>应</em>商</dt>
                <dd class="tuanqi"></dd>
                <dd class="text-over-hidden">{{item.GysCompanyName}}</dd>
              </dl>
              <dl class="clearfix fatuanDate">
                <dt>发团日期</dt>
                <dd class="tuanqi"></dd>
                <dd><div class="date" style="cursor: pointer" @click="toDetail('#/xianlu/detail', item.Id)">查看团期</div></dd>
              </dl>
            </div>
            <div class="ProductWrap">
              <div class="ProductPrice">
                <span>￥<strong style="font-size: 30px;">{{item.Price}}</strong></span>起
              </div>
              <div class="ProductBtn" @click="toDetail('#/xianlu/detail', item.Id)">查看详情</div>
              <p><em>100%</em>满意度</p>
            </div>
          </el-card>
        </el-col>
        <el-col style="width: 100%;overflow: hidden;" :span="24">
          <pager :pager="pager" @changePage="changePage" style="margin:20px 100px"></pager>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24" style="background: #fff;margin-bottom: 20px">
          <div class="noData">
            <img src="/static/noresult.png" alt="">
            <text>暂无相关信息</text>
          </div>
        </el-col>
      </el-row>
      <div class="MainTips fr">
        <div class="MainTipsItem HotDestination">
          <h3>热门目的地</h3>
          <ul class="clearfix">
            <li v-for="(item, index) in hotList" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="MainRightItem">
          <h3>周边推荐</h3>
          <ul class="want">
            <li v-for="(item, index) in hotListData" :key="index">
              <div @click="toDetail('#/xianlu/detail', item.Id)">
                <img :src="item.Img" onerror="this.src = '/static/default.gif'" alt="">
              </div>
              <div class="name">
                <div @click="toDetail('#/xianlu/detail', item.Id)">{{item.Name}}</div>
              </div>
              <div class="info">
                <span><em>¥<i>{{item.Price}}</i></em>起</span>
                <div @click="toDetail('#/xianlu/detail', item.Id)">去看看</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import Search from './module/Search'
import Mulchoice from '@/components/Mulchoice'
import List from './module/tourlList'
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Tour',
  components: {
    TourSearch: Search,
    MulChoice: Mulchoice,
    TourList: List
  },
  data () {
    return {
      datalist: {},
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      // 列表数据
      listData: [],
      // 热门目的地
      hotList: [],
      // 搜索条件
      searchList: {
        KeyWord: '',
        choose: {},
        OrderByType: 0,
        OrderByValue: 0,
        MaxPrice: '',
        MinPrice: '',
        ChuFaId: '',
        MuDiDiId: ''
      },
      loading: false,
      hotListData: []
    }
  },
  created () {
    this.getAllData()
  },
  watch: {
    '$route.query.id' () {
      this.getAllData()
    }
  },
  methods: {
    getAllData () {
      this.getList()
      this.getData()
      this.getHotMuDis()
      this.getHotProductList()
    },
    // 获取头部搜索列表
    getList () {
      serverHttp.searchList({
        LanMuId: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.datalist = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 获取列表数据
     */
    getData () {
      this.loading = true
      serverHttp.productList({
        LanMuId: this.$route.query.id,
        KeyWord: this.searchList.KeyWord,
        MuDiDiId: this.searchList.choose.twos ? this.searchList.choose.twos.id : this.searchList.choose.MuDiDi ? this.searchList.choose.MuDiDi.id : '',
        LeiXingId: this.searchList.choose.XianLuLeiXing ? this.searchList.choose.XianLuLeiXing.Id : '',
        ZhuTiId: this.searchList.choose.ChanPinZhuTi ? this.searchList.choose.ChanPinZhuTi.Id : '',
        JiaoTongId: this.searchList.choose.WangFanJiaoTong ? this.searchList.choose.WangFanJiaoTong.Id : '',
        JiaGeId: this.searchList.choose.JieGeFanWei ? this.searchList.choose.JieGeFanWei.Id : '',
        TianShuId: this.searchList.choose.YouWanTianShu ? this.searchList.choose.YouWanTianShu.Id : '',
        OrderByType: this.searchList.OrderByType,
        OrderByValue: this.searchList.OrderByValue,
        MaxPrice: this.searchList.MaxPrice,
        MinPrice: this.searchList.MinPrice,
        Index: this.pager.page,
        ChuFaId: this.searchList.ChuFaId
      }).then(res => {
        console.log(res)
        this.loading = false
        if (res.code === 0) {
          this.listData = res.data.List
          this.pager.total = res.data.Count
          this.pager.page = res.data.Index
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 获取热门目的地
     */
    getHotMuDis () {
      serverHttp.getHotmuDiDi({
        LanMuId: this.$route.query.id
      }).then(res => {
        if (res.code === 0) {
          this.hotList = res.data
        } else {
          this.$message.error(res.mag)
        }
      })
    },
    /**
     * 热门产品列表
     */
    getHotProductList () {
      serverHttp.getHotProductList({
        LanMuId: this.$route.query.id,
        Size: 5
      }).then(res => {
        if (res.code === 0) {
          this.hotListData = res.data.List
        } else {
          this.$message.error(res.mag)
        }
      })
    },
    changePage (val) {
      this.pager.page = val
      this.getData()
    },
    chooseFilter (e) {
      this.searchList.choose = e
      this.pager.page = 1
      this.getData()
    },
    search (e) {
      this.searchList.KeyWord = e.input
      this.searchList.ChuFaId = e.ChuFaId
      this.pager.page = 1
      this.getData()
    },
    sort (data) {
      this.searchList.OrderByType = data.OrderByType
      this.searchList.OrderByValue = data.OrderByValue
      this.searchList.MaxPrice = data.MaxPrice
      this.searchList.MinPrice = data.MinPrice
      this.pager.page = 1
      this.getData()
    },
    toDetail (path, id) {
      window.open(path + '?Imid=' + this.$route.query.id + '&id=' + id, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.tour{
  width: 1200px;
  margin: 0 auto;
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
      background-color: #fff;
      transition: all .2s ease-in-out;
      .el-card{border-radius: 0;}
      .imagebox{
        position: relative;
        display: block;
        padding: 20px;
        float: left;
        cursor: pointer;
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
          max-height: 46px;
          color: #333;
          font-size: 16px;
          font-family: "微软雅黑",tahoma,'宋体',Arial,Lucida,Verdana,Helvetica,sans-serif;
          font-weight: 500;;
          line-height: 1.5;
          cursor: pointer;
          &:hover{
            color: #f63;
          }
        }
        .ZhuTi{
          margin-top:10px;
          height:18px;
          overflow: hidden;
          &.second{
            margin-bottom:-7px;
            height: 54px;
            span{margin-bottom:10px;}
          }
          span{
            float: left;
            padding: 0 3px;
            display: inline-block;
            margin-right: 6px;
            color: #f63;
            border: 1px solid #f63;
            border-radius: 2px;
          }
        }
        dl{
          margin-top: 8px;
          height: 22px;
          line-height: 22px;
          &.gys+dl{
            margin-top:7px
          }
          dt{
            float: left;
            width: 65px;
            color: #aaa;
            em{margin:0 6px 0 7px;}
            dd{
              position: relative;
              display: inline-block;
              height: 22px;
              line-height: 22px;
              color: #666;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              &.tuanqi{max-width: 375px;}
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
          cursor: pointer;
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
          li{
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
            cursor: pointer;
          }
          li:hover{
            background: #f60;
            color: #fff
          }
        }
      }
      .MainRightItem {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid #eee;

        h3 {
          padding-left: 15px;
          height: 36px;
          line-height: 50px;
          font-size: 16px;
          font-weight: 500;
        }

        .want {
          padding: 10px 10px 0;
          overflow: hidden;

          li {
            position: relative;
            padding: 10px 0;
            border-top: 1px solid #e5e5e5;
          }

          div{
            display: block;
            width: 100%;
            height: 150px;
            overflow: hidden;
            cursor: pointer;

            img {
              width: 100%;
              height: 150px;
            }
          }

          .name {
            margin-top: 10px;
            height: 40px;
            line-height: 20px;
            overflow: hidden;
            color: #666;
            font-size: 14px;

            div{
              color: #333;
              text-decoration: none;
              cursor: pointer;
            }
          }

          .info {
            position: relative;
            height: 30px;
            color: #999;
            font-size: 12px;

            span {
              position: absolute;
              bottom: 5px;
              left: 0;
              font-size: 14px;

              em {
                margin-right: 3px;
                color: #f63;
                font-size: 16px;
              }
            }

            div {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 80px;
              height: 25px;
              line-height: 25px;
              text-align: center;
              background: #f60;
              color: #fff;
              border-radius: 3px;
              cursor: pointer;
            }
          }
        }

        .hotel{
          padding: 13px;
          overflow: hidden;

          li{
            margin-top: 13px;
            padding: 0 5px;
            overflow: hidden;
            color: #333333;

            img {
              width: 80px;
              height: 61px;
              margin-right: 10px;
              float: left;
            }

            div {
              float: left;
              width: calc(100% - 90px);

              p:first-child {
                font-size: 14px;
                line-height: 18px;
              }

              p:last-child {
                margin-top: 20px;
                color: #666;
                span{
                  display: inline-block;
                  width: 50%;
                  i {
                    color: #f60;

                    strong {
                      font-size: 16px;
                    }
                  }
                }
                span:last-child{
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
