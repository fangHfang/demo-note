<template>
  <div class="home-index" v-loading="loading">
    <div class="banner">
      <section class="banner-search">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo banner-search-nav"
          background-color="#3aa400"
          text-color="#fff"
          active-text-color="#3aa400"
        >
          <el-menu-item :index="''+(index+1)" v-for="(item, index) in leftLanMu" :key="index" @click="getHotList(item)">
            <span slot="title">{{item.Name}}</span>
          </el-menu-item>
        </el-menu>
        <div class="search-box">
          <div class="top-item">
            <p>关键字:</p>
            <el-input v-model="searchData.KeyWord" placeholder="线路关键字"></el-input>
            <p>目的地:</p>
            <muDiDi placeholder="出发目的地" @changeItem="changeItem"></muDiDi>
            <div class="tx-right">
              <el-button type="warning" size="small" class="warning-btn searchBtn" @click="search">搜索</el-button>
            </div>
          </div>
          <div class="bottom-item">
            <p style="margin: 5px 0 10px;border-left: 3px solid #029a3c;padding-left: 8px;font-size: 14px;">热门目的地</p>
            <p>
              <span style="margin-right: 8px;line-height: 20px;" v-for="(item, index) in hotList" :key="index">{{item.name}}</span>
            </p>
          </div>
        </div>
      </section>
      <el-carousel :interval="5000" arrow="hover" height="360">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <a :href="'http://' + item.LinkAddress" target="_blank">
            <img :src="item.PicturePath" onerror="this.src = '/static/default.gif'" :alt="item.PicRemark" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="index-panel" :class="[item.Controller == 'xianlu' ? 'index-tour-panel' : '']" v-for="(item, index) in listData" :key="index">
      <div class="index-wrapper">
        <div class="index-title">
          <h2>{{item.Name}}</h2>
          <ul class="tab">
            <li :class="{'active':item.activeIndex===0}" @click="filterAddress(item, index, v, 0)">全部</li>
            <li :class="{'active': item.activeIndex===(vIndex+1)}" v-for="(v, vIndex) in item.allMuDiDi" v-if="vIndex<15" :key="vIndex" @click="filterAddress(item, index, v, vIndex + 1)">{{v.Name}}</li>
          </ul>
        </div>
        <div class="index-panel-wrap clearfix">
          <div class="index-panel-left clearfix">
            <ul class="tab-list clearfix" v-if="item.PruductList&&item.PruductList.data.length">
              <li :class="{'tab-first':productindex==0}" v-for="(productitem,productindex) in item.PruductList.data" :key="productindex" :title="productitem.Title" @click="toDetail(item, productitem)">
                <div class="pic-box">
                  <img src="/static/index/download.jpg">
                  <em class="zyx">{{productitem.XianLuLeiXing}}</em>
                </div>
                <div class="detail-box">
                  <h3 class="text-over-hidden2">{{productitem.Title}}</h3>
                  <div>
                    <span>{{productitem.ChuFaDi}}</span>
                    <em><b>¥</b><i>{{productitem.Price}}</i>起</em>
                  </div>
                </div>
              </li>
            </ul>
            <div class="noResult" v-else>
              <i></i>
              <p>暂无相关产品信息</p>
            </div>
          </div>
          <div class="index-panel-right">
            <div class="search-item" v-for="(child, childIndex) in item.LanMudData.data" :key="childIndex" v-if="item.LanMudData&&item.LanMudData.data">
              <h4 v-if="childIndex === 'ChanPinZhuTi'&&child.length>0">产品主题</h4>
              <h4 v-if="childIndex === 'MuDiDi'&&child.length>0">目的地</h4>
              <h4 v-if="childIndex === 'YouWanTianShu'&&child.length>0">游玩天数</h4>
              <h4 v-if="childIndex === 'XianLuLeiXing'&&child.length>0">线路类型</h4>
              <ul class="clearfix" v-if="childIndex === 'ChanPinZhuTi' || childIndex === 'MuDiDi' || childIndex === 'YouWanTianShu' || childIndex === 'XianLuLeiXing'">
                <li v-for="(itemChild, index) in child" :key="index" @click="toRouter(item, child, itemChild, childIndex)"><span>{{itemChild.Name}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import muDiDi from '@/components/MucityList'
import serveHttp from '@/assets/common/index'
import tourHttp from '@/assets/common/tour'
export default {
  name: 'index',
  data () {
    return {
      input: '',
      activeIndex: 0,
      listData: [],
      banner: [],
      allData: [],
      loading: false,
      leftLanMu: [],
      searchData: {
        MuDiDi: '',
        KeyWord: ''
      },
      hotList: [],
      OneItem: {},
      MuDiItem: ''
    }
  },
  components: {muDiDi},
  created () {
    if (localStorage.getItem('token')) {
      this.getList()
      this.getBaseData('all', 0)
    }
  },
  methods: {
    getList () {
      serveHttp.getBanner({}).then(res => {
        if (res.code === 0) {
          this.banner = res.data
          if (this.banner.length === 0) {
            this.banner.push({PicturePath: '/static/default.gif'})
          }
          this.$store.commit('setBanner', res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
      serveHttp.leftLanMu().then(res => {
        if (res.code === 0) {
          this.leftLanMu = res.data
          this.OneItem = res.data[0]
          this.getHotList(res.data[0])
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getHotList (item) {
      this.OneItem = item
      tourHttp.getHotmuDiDi({
        LanMuId: item.Id
      }).then(res => {
        if (res.code === 0) {
          this.hotList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getBaseData (isAll, type, index, vIndex, v) {
      this.loading = true
      serveHttp.getBodyMuLu().then(res => {
        this.loading = false
        if (res.code === 0) {
          this.allData = res.data
          this.listData = res.data
          if (this.listData.length > 0) {
            this.listData.map((v) => {
              let arr = []
              if (v.PruductList.data.length > 0) {
                let data = v.PruductList.data
                data.forEach(item => {
                  if (item.MuDiDi.length > 0) {
                    item.MuDiDi.map(child => {
                      arr.push(child)
                    })
                  }
                })
              }
              this.$set(v, 'allMuDiDi', this.unique1(arr))
              this.$set(v, 'activeIndex', 0)
            })
          }
          if (isAll !== 'all') {
            let arr = []
            this.$set(this.listData[index], 'activeIndex', vIndex)
            if (this.listData[index].PruductList.data.length && vIndex !== 0) {
              this.listData[index].PruductList.data.forEach(child => {
                if (child.MuDiDi.length > 0) {
                  child.MuDiDi.forEach(city => {
                    if (city.Name === v.Name) {
                      arr.push(child)
                    }
                  })
                }
              })
              this.$set(this.listData[index].PruductList, 'data', arr)
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 数组去重
    unique1 (oldArr) {
      for (var i = 0; i < oldArr.length - 1; i++) {
        for (var j = 1; j < oldArr.length; j++) {
          if (i !== j) {
            if (oldArr[i].Name === oldArr[j].Name) {
              oldArr.splice(j, 1)
            }
          }
        }
      }
      return oldArr
    },
    toDetail (item, child) {
      window.open('#/' + item.Controller + '/detail?id=' + child.Id + '&Imid=' + item.Id, '_blank')
    },
    // 搜索
    filterAddress (item, index, v, vIndex) {
      this.getBaseData(item, vIndex + 1, index, vIndex, v)
    },
    search () {
      if (this.MuDiItem) {
        window.open('#/' + this.OneItem.Controller + '/index?id=' + this.OneItem.Id + '&KeyWord=' + this.searchData.KeyWord + '&MuDiDi=' + JSON.stringify(this.MuDiItem), '_blank')
      } else {
        window.open('#/' + this.OneItem.Controller + '/index?id=' + this.OneItem.Id + '&KeyWord=' + this.searchData.KeyWord, '_blank')
      }
    },
    toRouter (item, child, itemChild, childIndex) {
      window.open('#/' + item.Controller + '/index?id=' + item.Id + '&' + childIndex + '=' + JSON.stringify(itemChild), '_blank')
    },
    // 选择城市
    changeItem (e) {
      this.searchData.MuDiDi = e.Id
      this.MuDiItem = e
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .clearfix:before, .clearfix:after{content:"\0020";display:block;height:0;overflow:hidden;}
  .clearfix:after{clear:both;}
  .clearfix{zoom:1;}
  .noResult{
    float:left;
    width:968px;
    padding-bottom:150px;
    i{
      display: block;
      margin:150px auto 20px;
      width: 128px;
      height: 135px;
      background: url("/static/noresult.png") no-repeat center center;
    }
    p{
      margin-bottom:25px;
      color: #caced4;
      font-size: 14px;
      text-align: center;
    }
  }

  .index-panel{
    padding-top:30px;
    min-height: 580px;
    background-color: #fff;
    > .index-wrapper{
      margin: 0 auto;
      width: 1200px;
    }
    /*&.bg_f5f5f5,*/
    &:nth-of-type(even){
      background-color: #f5f5f5;
    }
    &.bg_f5f5f5{
      .tab li{
        border: 1px solid #f5f5f5;
      }
    }
    .index-title{
      height: 44px;
      margin-bottom:10px;
      h2{float: left;font-weight: 700;color:#333;font-size: 28px;line-height: 44px;}
      ul{
        float: left;
        margin: 10px 0 0 50px;
        li{
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #666;
          float: left;
          margin-left: 30px;
          cursor: pointer;
          &.active{
            color: #00c77b;
            border-bottom: 3px solid #00c77b;
            font-weight: 700;
          }
        }
      }
    }
    .index-panel-left{
      float: left;
      width: 968px;
      > div{opacity: 1 !important;}
    }
    .tab-list li{
      position: relative;
      float:left;
      margin:0 20px 20px 0;
      width:222px;
      cursor: pointer;
      &:hover{
        box-shadow: 0 1px 10px rgba(0,0,0,.13);
        img{-moz-transform: scale(1.1);-ms-transform: scale(1.1);-o-transform: scale(1.1);transform: scale(1.1)}
      }
      .pic-box{
        position: relative;width:100%;height:148px;overflow: hidden;
        em{
          color: #fff;line-height: 22px;position: absolute;background: #5589be;top: 0;left: 0;padding: 0 9px;z-index: 19;
          &.zyx{background: #2fc7b0;}
        }
        img{width:100%;height:100%;background:url("/static/loading.gif") center center no-repeat;-webkit-transition: all .5s ease 0s;-moz-transition: all .5s ease 0s;-ms-transition: all .5s ease 0s;  -o-transition: all .5s ease 0s;transition: all .5s ease 0s}
      }
      .detail-box{
        padding:8px 10px 0 10px;height:86px;background-color:#fff;border: 1px solid #eee;border-top:none;
        h3{
          height:44px;
          line-height: 22px;
          color: #333;
          font-size: 16px;
          font-weight: normal;
        }
        div{margin-top:10px;color: #999;line-height: 20px;}
        span{display:inline-block;max-width:120px;height:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        em{
          float: right;
          b{color: #ff5346;font-size: 16px;font-weight: 400;}
          i{margin-right:2px;color: #ff5346;font-size: 20px;font-family: Arial;}
        }
      }
      &.tab-first{
        width: 464px;
        .pic-box{height:243px;}
        .detail-box{
          position:absolute;bottom:0;left:0;right:0;padding:9px 10px 7px 10px;height:auto;background: url("/static/index_tab_first.png") repeat;color: #fff;border:none;
          h3{height:24px;line-height:24px;color:#fff;font-size: 18px;display:block;text-overflow: ellipsis;white-space: nowrap;}
          div{margin-top:3px;line-height: 22px;color: #ccc;font-size: 14px;}
          b{font-size: 18px;}
          i{font-size: 22px;}
        }
      }
    }
    .index-panel-right{float:left;width: 222px;height:504px;border-top:2px solid;overflow:hidden;}
    .search-item{
      margin-bottom:5px;
      h4{padding:9px 0 0 15px;line-height: 27px;font-size: 14px;font-weight: 700;}
      ul{
        max-height: 104px;
        overflow: hidden;
        li{
          float:left;
          margin-left:15px;
          min-width:48px;
          max-width:70px;
          span{
            display:block;
            height:27px;
            line-height: 27px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover{color: #ff5d3d;}
          }
        }
      }
    }
    &.index-tour-panel .index-panel-right{background-color: #f0fffa;border-top-color: #bcede1;}
    &.index-hotel-panel,
    &.index-scenic-panel{
      .index-panel-left{width: 1200px;}
      .tab-list{margin-right:-20px;}
    }
    &.index-hotel-panel .tab-list li{width: 222px;}
    &.index-scenic-panel .tab-list li{
      width: 285px;
      .pic-box{height: 190px;}
      .detail-box{
        position:relative;
        padding:8px 10px;
        height:auto;
        > div{
          position: relative;
        }
        h3{
          max-width: 190px;
          height:30px;
          line-height:30px;
          overflow: hidden;
        }
        em{
          position: absolute;
          top:2px;
          right:10px;
        }
      }
    }
  }
.home-index {
  .banner {
    width: 1200px;
    margin: 0 auto;
    height: 360px;
    .banner-search {
      width: 350px;
      height: 100%;
      float: left;
      .banner-search-nav {
        width: 90px;
        height: 100%;
        float: left;
        .is-active {
          background: #fff !important;
        }
      }
      .el-menu-item{
        padding-left: 10px!important;
        padding-right: 10px!important;
        text-align: right;
      }
      .search-box {
        width: 258px;
        box-sizing: border-box;
        padding: 10px;
        height: 100%;
        float: left;
        background: #fff;
        .top-item {
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
          p {
            line-height: 30px;
            font-size: 14px;
          }
          .el-input__inner {
            height: 30px;
            &:focus {
              border-color: #3aa400;
            }
          }
          .searchBtn {
            margin-top:15px;
            width: 120px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: #ff7800;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            border: 0;
            border-radius: 3px;
            letter-spacing: 1px;
            &:hover{
              background-color: #f60;
            }
          }
        }
      }
    }
    .el-carousel--horizontal {
      width: 850px;
      height: 100%;
      .el-carousel__container {
        height: 360px;
        .el-carousel__item {
          margin: 0;
          img {
            width: 100%;
            height: 360px;
          }
        }
      }
    }
  }
}
</style>
