<template>
  <div class="hotel_list" id="hotel_ziying" v-loading="loading">
    <mul-choice v-bind:datalist="datalist" :pager="pager" v-if="pager.page"></mul-choice>
    <el-row>
      <el-col :span="18" class="L-list" v-if="hotelListData.length === 0">
        <div class="noData">
          <img src="/static/noresult.png" alt="">
        </div>
      </el-col>
      <el-col :span="18" class="L-list" v-else>
        <div class="ProductItem" v-for="(item, index) in hotelListData" :key="index">
          <div class="ProductImg" target="_blank" @click="toDetail(item.Id)">
            <img :src="item.BasePicture" onerror="this.src = '/static/noresult.png'" alt="">
          </div>
          <div class="ProductInfo">
            <h3 @click="toDetail(item.Id)">
              <div target="_blank" :title="item.Name"><i class="list-icon">{{index+1}}</i>{{item.Name}}
              </div>
            </h3>
            <dl class="clearfix">
              <dt>酒店地址</dt>
              <dd v-if="item.RegionName">{{item.RegionName.Name}}</dd>
            </dl>
            <dl class="clearfix">
              <dt>供应商</dt>
              <dd>{{item.GongYingShang.JiGou}}</dd>
            </dl>
            <div class="service-other">
              <span class="service-icon-yyc" title="游泳池"></span>
              <span class="service-icon-jsf" title="健身房"></span>
              <span class="service-icon-ct" title="餐厅"></span>
              <span class="service-icon-xljc" title="行李寄存"></span>
            </div>
            <div class="zhuti clearfix">
              <span v-for="(v, index) in item.Attributes" :key="index">{{v.Name}}</span>
            </div>
          </div>
          <div class="ProductWrap">
            <div class="ProductPrice">
              <span><strong>请咨询</strong></span>
            </div>
            <div class="ProductBtn" @click="toDetail(item.Id)" target="_blank">查看详情</div>
            <p><em>97%</em>好评</p>
          </div>
        </div>
        <pager :pager="pager" @changePage="changePage" style="margin:20px 0"></pager>
      </el-col>
      <el-col :span="6" class="R-map">
        <div class="tuijian-title"><span><i class="map-icon"></i>地图预览</span></div>
        <div id="XSDFXPage" class="XSDFXPage">
          <!-- <addressShow></addressShow> -->
        </div>
        <div class="MainTips fr">
          <div class="MainTipsItem HotDestination">
            <h3>热门酒店</h3>
            <ul class="clearfix">
              <li v-for="(item, index) in hotelListRenMenData" :key="index">
                <img @click="toDetail(item.Id)" :src="item.BasePicture" onerror="this.src = '/static/noresult.png'" alt="" class="toDetail">
                <div>
                  <p class="text-over-hidden toDetail" @click="toDetail(item.Id)">{{item.Name}}</p>
                  <p class="text-over-hidden">{{item.RegionName}}</p>
                  <p class="text-over-hidden"><i>￥<strong>{{item.Price}}</strong></i> 起</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Mulchoice from '@/components/Mulchoice'
import serverHttp from '@/assets/common/hotel'
export default {
  name: 'list',
  components: {
    MulChoice: Mulchoice
  },
  data () {
    return {
      pager: {
        page: 1,
        total: ''
      },
      datalist: [
        {
          title: '酒店类型',
          list: [
            '全部',
            '常住型酒店',
            '快捷酒店',
            '观光型酒店',
            '会议型酒店'
          ],
          Index: 0
        },
        {
          title: '价格类型',
          list: [
            '全部',
            '100-300',
            '300以上'
          ],
          Index: 0
        },
        {
          title: '星级档次',
          list: ['全部', '一星级', '三星级', '五星级'],
          Index: 0
        },
        {
          title: '品牌连锁',
          list: ['全部', '如家酒店连锁'],
          Index: 0
        },
        {
          title: '服务项目',
          list: ['全部', '外币兑换服务'],
          Index: 0
        },
        {
          title: '餐厅服务',
          list: ['全部', '宴会'],
          Index: 0
        }
      ],
      hotelListData: [],
      hotelListRenMenData: [],
      loading: false
    }
  },
  methods: {
    toDetail (id) {
      let routeData = this.$router.resolve({name: 'HotelListInfo', query: {id, siteLanMuId: this.$route.query.id}})
      window.open(routeData.href, '_blank')
    },
    changePage (page) {
      this.pager.page = page
      this.getHotelList()
    },
    getHotelList: function () {
      this.loading = true
      this.hotelListData = []
      let SiteLanMuId = this.siteLanMuId
      let Page = this.pager.page
      serverHttp.GetListPageForB2B({SiteLanMuId, Page}).then(res => {
        this.loading = false
        this.hotelListData = res.data.List
        this.pager.total = res.data.Count
      })
    },
    getHotelListRenMen () {
      let SiteLanMuId = this.siteLanMuId
      serverHttp.GetListForReMen({SiteLanMuId}).then(res => {
        this.hotelListRenMenData = res.data
      })
    }
  },
  mounted: function () {
    this.siteLanMuId = this.$route.query.id
    this.getHotelList()
    this.getHotelListRenMen()
  }
}
</script>
<style lang="scss" scoped>
  #hotel_ziying {
    .L-list {
      min-height: 430px;

      .noList {
        text-align: center;
        line-height: 430px;
      }

      .ProductItem {
        position: relative;
        margin-bottom: 15px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        overflow: hidden;

        a {
          color: #333;

          &:hover {
            text-decoration: none;
          }
        }

        .ProductImg {
          position: relative;
          float: left;
          width: 260px;
          overflow: hidden;
          cursor: pointer;
          img {
            display: block;
            width: 260px;
            height: 170px;
            background-color: #ccc;
            transition: all .3s ease;
          }

          &:hover {
            img {
              transform: scale(1.1, 1.1);
            }
          }
        }

        .ProductInfo {
          float: left;
          padding: 10px 20px;
          width: 435px;

          .list-icon {
            width: 24px;
            height: 30px;
            background: url("/static/all.png") no-repeat;
            background-position: -64px -73px;
          }

          h3 {
            position: relative;
            margin-bottom: 10px;
            padding-left: 33px;
            display: block;
            height: 30px;
            color: #333;
            font-size: 20px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            cursor: pointer;
            .router-link-active {
              color: #333;
            }

            i {
              position: absolute;
              top: 0px;
              left: 0;
              width: 24px;
              height: 30px;
              line-height: 25px;
              text-align: center;
              color: #fff;
              font-size: 14px;
              background-position: -64px -73px;
            }
          }

          dl {
            height: 22px;
            line-height: 22px;
            font-size: 14px;

            dt {
              float: left;
              width: 65px;
              color: #aaa;
            }

            dd {
              position: relative;
              float: left;
              width: 370px;
              height: 22px;
              line-height: 22px;
              color: #666;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }

        .zhuti {
          margin: 10px 0 0;
          height: 54px;
          overflow: hidden;

          span {
            padding: 0 3px;
            margin-right: 6px;
            margin-bottom: 7px;
            display: inline-block;
            color: #f63;
            border: 1px solid #f63;
            border-radius: 2px;
          }
        }

        .ProductWrap {
          float: right;
          margin: 20px 0;
          width: 163px;
          text-align: center;

          .ProductPrice {
            margin: 10px 0 13px 0;
            height: 30px;
            line-height: 22px;
            color: #999;
            font-size: 14px;

            span {
              margin-right: 5px;
              color: #f60;
              font-size: 18px;
            }

            strong {
              margin-left: 3px;
              font-size: 22px;
              font-weight: 400;
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
            cursor: pointer;
          }

          p {
            margin-top: 10px;
            margin-right: 25px;
            text-align: right;

            em {
              margin-right: 5px;
              color: #ff7800;
              font-size: 16px;
            }
          }
        }

        &:hover {
          border-color: #f60;

          a {
            color: #f60;
          }

          .ProductInfo {
            .list-icon {
              background-position: -88px -73px;
            }
          }
        }
      }
    }

    .R-map {
      width: 290px;
      float: right;

      .tuijian-title {
        background: #fff;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 40px;

        span {
          width: 130px;
          display: block;
          height: 40px;
          background: #3aa400;

          .map-icon {
            width: 12px;
            height: 17px;
            display: inline-block;
            margin-right: 6px;
            vertical-align: middle;
            background: url("/static/all.png") no-repeat;
            background-position: -112px -78px;
          }
        }
      }

      .XSDFXPage {
        height: 430px;
        background: #fff;
        margin-bottom: 15px;
      }

      .MainTips {
        width: 100%;
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

            li {
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

            li:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .toDetail{
    cursor: pointer;
  }
</style>
