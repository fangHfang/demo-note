<template>
  <div class="views-index">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="所在地" class="pad">
        <city-list :placeholderName="'出发地'" @changeItem="changeItem"></city-list>
      </el-form-item>
      <el-form-item label="关键字" class="pad">
        <el-input v-model="searchData.QueryText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <mul-choice v-bind:datalist="datalist" :pager="pager" @changePage="changePageTop"></mul-choice>
    <div class="views-list" v-loading="loading">
      <div class="left-content">
        <el-row>
          <el-col class="card" :span="24" v-for="(item, index) in allData" :key="index">
            <el-card :body-style="{ padding: '0px' }">
              <div class="imagebox" @click="toDetail(item)">
                <img :src="item.BasePicture" onerror="this.src = '/static/default.gif'" class="image">
              </div>
              <div class="ProductInfo">
                <h3>
                  <div class="title text-over-hidden" :title="item.Name" @click="toDetail(item)">{{item.Name}}<span class="level">{{item.JQGrade}}景区</span></div>
                </h3>
                <dl class="clearfix fatuanDate">
                  <dt>供应商</dt>
                  <dd class="tuanqi">{{item.GongYingShang.JiGou}}</dd>
                </dl>
                <dl class="clearfix fatuanDate">
                  <dt>景区地址</dt>
                  <dd class="tuanqi">{{item.RegionName.Name}} <i style="color: #029a3c">查看地图</i></dd>
                </dl>
                <dl class="clearfix fatuanDate">
                  <dt>营业时间</dt>
                  <dd class="tuanqi">{{item.JQPlayTime}}</dd>
                  <dd></dd>
                </dl>
                <!--<dl class="clearfix fatuanDate">
                  <dt>景区特色</dt>
                  <dd class="tuanqi">走进山水田园，体验农事，做客老宅</dd>
                  <dd></dd>
                </dl>-->
              </div>
              <div class="ProductWrap">
                <div class="ProductPrice">
                  <span>{{item.PriceTH===0?'请咨询':item.PriceTH}}</span>
                </div>
                <el-link class="ProductBtn" :underline="false" @click="toDetail(item)">查看详情</el-link>
                <p><em>100%</em>满意度</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <pager :pager="pager" @changePage="changePage" style="margin:20px 0"></pager>
      </div>
      <div class="MainTips fr">
        <div class="MainTipsItem HotDestination">
          <h3>推荐酒店</h3>
          <ul class="clearfix">
            <li v-for="(item, index) in hotelData" :key="index">
              <img :src="item.BasePicture" onerror="this.src = '/static/default.gif'" alt="">
              <div>
                <p class="text-over-hidden">{{item.Name}}</p>
                <p class="text-over-hidden" v-if="item.Region">{{item.Region.Name}}</p>
                <p class="text-over-hidden"><i>￥<strong>{{item.Price}}</strong></i> 起</p>
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
import Mulchoice from '@/components/Mulchoice'
import serverHttp from '@/assets/common/jingqu'
import cityList from '@/components/cityZiYing'
export default {
  name: 'Tour',
  components: {
    MulChoice: Mulchoice,
    CityList: cityList
  },
  data () {
    return {
      datalist: [
        {
          title: '景区类型',
          list: [
            '全部',
            '历史人文景观',
            '自然景观',
            '娱乐景区'
          ],
          Index: 0
        },
        {
          title: '价格类型',
          list: [
            '全部',
            '100以下',
            '100-300'
          ],
          Index: 0
        },
        {
          title: '景区星级',
          list: ['全部', 'A', 'AA', 'AAA', 'AAAA'],
          Index: 0
        },
        {
          title: '景区主题',
          list: ['全部', '园林', '古迹', '古镇', '自然风光'],
          Index: 0
        },
        {
          title: '适宜人群',
          list: ['全部', '家庭亲子游', '情侣游', '老人游'],
          Index: 0
        }
      ],
      tag: '太原出发',
      zhuti: ['邮轮旅游', '常规旅游', '毕业游'],
      pager: {
        page: 1,
        total: ''
      },
      searchData: {QueryText: ''},
      allData: [],
      loading: false,
      hotelData: []
    }
  },
  methods: {
    changePage (val) {
      this.pager.page = val
      this.getList()
    },
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'scenicDetail', query: {id: item.Id, siteLanMuId: this.$route.query.id}})
      window.open(routeData.href, '_blank')
    },
    getList () {
      let Name = this.searchData.QueryText
      let Page = this.pager.page
      this.loading = true
      this.allData = []
      serverHttp.GetListPageForB2B({SiteLanMuId: this.$route.query.id, Name, Page}).then(res => {
        this.loading = false
        this.allData = res.data.List
        this.pager.total = res.data.Count
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    changePageTop (data) {
      this.pager.page = data
      this.getList()
    },
    getTuiJuan () {
      serverHttp.GetJiuDianListForTuiJian({SiteLanMuId: 'e37265adb2cd413aad6ee61ead857ff5'}).then(res => {
        console.log(res)
        this.hotelData = res.data
      })
    },
    changeItem (data) {
      console.log(data)
    }
  },
  mounted () {
    this.getList()
    this.getTuiJuan()
  }
}
</script>
<style lang="scss">
  .views-index{
    width: 1200px;
    margin: 0 auto;
  }
  .views-list {
    .left-content{
      width: 930px;
      float: left;
    }

    .clear {
      clear: both
    }

    .card {
      width: 100%;
      height: 142px;
      overflow: hidden;
      margin-bottom: 15px;
      border: 1px solid #e5e5e5;
      background-color: #fff;
      transition: all .2s ease-in-out;

      .imagebox {
        position: relative;
        display: block;
        float: left;

        img {
          width: 212px;
          height: 140px;
        }

        .tag {
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

      .ProductInfo {
        float: left;
        padding: 17px 20px;
        height: 140px;
        box-sizing: border-box;
        width: 493px;

        h3 {
          margin-bottom: 10px;

          .title {
            color: #333;
            font-size: 20px;
            display: block;
            width: 100%;
            font-weight: 500;
            cursor: pointer;
            .level{
              margin-left: 10px;
              padding: 0 5px;
              height: 16px;
              line-height: 16px;
              color: #f60;
              font-size: 12px;
              border: 1px solid #f60;
              border-radius: 4px;
            }
            &:hover{
              color: #f60;
            }
          }
        }

        dl {
          margin-top: 5px;
          height: 22px;
          line-height: 22px;

          dt {
            float: left;
            width: 65px;
            color: #aaa;

            dd {
              position: relative;
              display: inline-block;
              height: 22px;
              line-height: 22px;
              color: #666;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            i {
              color: #029a3c;
              margin-left: 15px;
            }
          }
        }
        dd > > > i{
          color: #029a3c;
        }
      }

      .ProductWrap {
        float: right;
        padding: 20px 0;
        box-sizing: border-box;
        width: 161px;
        height: 140px;
        text-align: center;

        .ProductPrice {
          height: 30px;
          line-height: 22px;
          color: #f60;
          font-size: 18px;
          margin-bottom: 10px;
        }

        p {
          margin-top: 8px;
          margin-right: 25px;
          text-align: right;

          em {
            margin-right: 5px;
            color: #ff7800;
            font-size: 16px;
          }
        }

        .ProductBtn {
          display: inline-block;
          padding: 0 25px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background-color: #ff7800;
          color: #fff;
          font-size: 16px;
          border-radius: 2px;
          outline: none;
        }

        .ProductBtn:hover {
          text-decoration: none;
          border: 0;
          outline: none;
        }
      }
    }

    .card:hover {
      box-shadow: 0 0 16px 2px rgba(0, 0, 0, .2);
    }

    .MainTips {
      width: 250px;
      float: right;

      .MainTipsItem {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 0 10px;

        h3 {
          padding-bottom: 10px;
          height: 36px;
          line-height: 50px;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid #ddd;
        }

        ul {
          padding: 0 0 13px;
          overflow: hidden;

          li{
            float: left;
            margin-top: 13px;
            overflow: hidden;
            border-bottom: 1px solid #ddd;
            color: #333333;
            padding-bottom: 10px;

            img {
              width: 80px;
              height: 61px;
              margin-right: 5px;
              float: left;
            }

            div {
              float: left;
              width: calc(100% - 85px);

              p:first-child {
                font-size: 14px;
                line-height: 18px;
              }

              p:nth-child(2) {
                font-size: 12px;
                line-height: 20px;
              }

              p:last-child {
                i {
                  color: #f60;

                  strong {
                    font-size: 16px;
                  }
                }
              }
            }
          }
          li:last-child{
            border-bottom: none;
          }
        }
      }
    }
  }
  .demo-form-inline {
      margin: 20px 0;
      padding: 10px 20px;
      height: 35px;
      background: #fbf0e3;
      border: 1px solid #f9dab8;

      .el-form-item__label {
        line-height: 35px;
      }

      .el-form-item__content {
        line-height: 35px;

        .el-input__inner {
          height: 31px;
          line-height: 31px;
        }
      }

      .pad .el-input__inner {
        padding: 0 5px;
      }

      .el-input__icon {
        line-height: 31px;
      }

      .el-button {
        line-height: 0.7;
        width: 100px;
        height: 31px;
        background: #f68b33;
        color: #fff;
        font-size: 14px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
    }
</style>
