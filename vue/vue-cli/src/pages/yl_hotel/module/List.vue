<template>
    <div class="yl_list" v-loading="loading">
        <el-row>
            <el-col :span="18" class="L-list" v-if="allData.length === 0">
                <div class="noData">
                    <img src="/static/noresult.png" alt="">
                </div>
            </el-col>
            <el-col :span="18" class="L-list" v-else>
                <div class="ProductItem" v-for="(item, index) in allData" :key="index">
                    <router-link to="/jiudiansanfang/detail" class="ProductImg" target="_blank">
                        <img :src="item.Detail.ThumbNailUrl" alt="">
                    </router-link>
                    <div class="ProductInfo">
                        <h3>
                            <router-link to="/jiudiansanfang/detail" target="_blank" :title= item.Detail.HotelName><i class="list-icon">{{index+1}}</i>{{item.Detail.HotelName}}</router-link>
                        </h3>
                        <dl class="clearfix">
                            <dt>酒店地址</dt>
                            <dd>{{item.Detail.Address}}</dd>
                        </dl>
                        <div class="service-other">
                        </div>
                        <div class="zhuti clearfix">
                            <span v-for="(n, i) in (item.Facilities)" :key="i">{{fuwuList[n]}}</span>
                        </div>
                    </div>
                    <div class="ProductWrap">
                        <div class="ProductPrice">
                            <span><strong>{{item.LowRate ? '￥'+item.LowRate:'请咨询'}}</strong></span>
                        </div>
                        <router-link class="ProductBtn" to="/jiudiansanfang/detail" target="_blank">查看详情</router-link>
                        <p><em>{{item.Detail.Review.Score}}</em>好评</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" class="R-map">
                <div class="tuijian-title"><span><i class="map-icon"></i>地图预览</span></div>
                <div id="XSDFXPage" class="XSDFXPage">
                  <addressShow></addressShow>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import serverHttp from '@/assets/common/yl_hotel'
export default {
  name: 'list',
  data () {
    return {
      allData: [],
      fuwuList: ['', '免费wifi', '收费wifi', '免费宽带', '收费宽带', '免费停车场', '收费停车场', '免费接机服务', '收费接机服务', '室内游泳池', '室外游泳池', '健身房', '商务中心', '会议室', '酒店餐厅', '叫醒服务', '行李寄存', '双床', '大床'],
      loading: true
    }
  },
  mounted () {
    this.getHotelList()
  },
  methods: {
    getHotelList: function () {
      serverHttp.GetListPage({ArrivalDate: '2019-9-11', DepartureDate: '2019-9-18', CityId: '0601', ResultType: '1,2,3,4'}).then(res => {
        this.loading = false
        res.data.List.forEach(item => {
          item.Facilities = item.Facilities.split(',')
        })
        this.allData = res.data.List
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .yl_list{
    .L-list{
      min-height: 430px;
      .noList{
        text-align: center;
        line-height: 430px;
      }
      .ProductItem{
        position: relative;
        margin-bottom: 15px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        overflow: hidden;
        a{
          color: #333;
          &:hover{
            text-decoration: none;
          }
        }
        .ProductImg{
          position: relative;
          float: left;
          width: 260px;
          overflow: hidden;
          img{
            display: block;
            width: 260px;
            height: 170px;
            background-color: #ccc;
            transition: all .3s ease;
          }
          &:hover{
            img{
              transform: scale(1.1, 1.1);
            }
          }
        }
        .ProductInfo{
          float: left;
          padding: 10px 20px;
          width: 435px;
          .list-icon{
            width: 24px;
            height: 30px;
            background: url("/static/all.png") no-repeat;
            background-position: -64px -73px;
          }
          h3{
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
            .router-link-active{
              color: #333;
            }
            i{
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
            dd{
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
        .zhuti{
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
        .ProductWrap{
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
        &:hover{
          border-color: #f60;
          a{
            color: #f60;
          }
          .ProductInfo{
            .list-icon{
              background-position: -88px -73px;
            }
          }
        }
      }
    }
    .R-map{
      width: 290px;
      float: right;
      .tuijian-title{
        background: #fff;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        span{
          width: 130px;
          display: block;
          height: 40px;
          background: #3aa400;
          .map-icon{
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
      .XSDFXPage{
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
  }
</style>
