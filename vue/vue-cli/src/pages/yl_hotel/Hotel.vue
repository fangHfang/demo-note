<template>
  <div class="hotelHome">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="所在地" class="pad">
        <city-list :placeholderName="placeholderName" @changeItem="selectCity" :defulteCity="'太原'"></city-list>
      </el-form-item>
      <el-form-item label="入住">
        <div class="block">
          <el-date-picker v-model="searchData.ArrivalDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="离店">
        <el-date-picker v-model="searchData.DepartureDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="关键字" class="pad">
        <el-input v-model="searchData.QueryText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getHotelList('1')">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 多项选择 -->
    <mul-choice :datalist="datalist" :pager="pager" @changePage="changePageTop" @hotelSort="hotelSort"></mul-choice>
    <!-- 列表 -->
    <div class="yl_list" v-loading="loading">
        <el-row>
            <el-col :span="18" class="L-list" v-if="allData.length === 0">
                <div class="noData">
                    <img src="/static/noresult.png" alt="">
                </div>
            </el-col>
            <el-col :span="18" class="L-list" v-else>
                <div class="ProductItem" v-for="(item, index) in allData" :key="index">
                    <div class="ProductImg" @click="toDetail(item.HotelId)" target="_blank">
                        <img :src="item.Detail.ThumbNailUrl" alt="">
                    </div>
                    <div class="ProductInfo">
                        <h3 @click="toDetail(item.HotelId)">
                            <div target="_blank" :title= item.Detail.HotelName><i class="list-icon">{{index+1}}</i>{{item.Detail.HotelName}}</div>
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
                        <div class="ProductBtn" @click="toDetail(item.HotelId)" target="_blank">查看详情</div>
                        <p><em>{{item.Detail.Review.Score}}</em>好评</p>
                    </div>
                </div>
                <pager :pager="pager" @changePage="changePage" style="margin:20px 0"></pager>
            </el-col>
            <el-col :span="6" class="R-map">
                <div class="tuijian-title"><span><i class="map-icon"></i>地图预览</span></div>
                <div id="XSDFXPage" class="XSDFXPage">
                  <addressShow :coordinate="coordinate" v-if="loading === false"></addressShow>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import serverHttp from '@/assets/common/yl_hotel'
import Mulchoice from '@/components/Mulchoice'
import cityList from '@/components/cityYlHotel'
export default {
  name: 'hotel',
  components: {
    MulChoice: Mulchoice,
    CityList: cityList
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now()
        }
      },
      placeholderName: '所在地',
      count: 0,
      searchData: {
        ArrivalDate: '',
        DepartureDate: '',
        CityId: '',
        QueryText: ''
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
      pager: {page: 1, total: ''},
      loading: false,
      fuwuList: ['', '免费wifi', '收费wifi', '免费宽带', '收费宽带', '免费停车场', '收费停车场', '免费接机服务', '收费接机服务', '室内游泳池', '室外游泳池', '健身房', '商务中心', '会议室', '酒店餐厅', '叫醒服务', '行李寄存', '双床', '大床'],
      allData: [],
      cityId: '0601',
      coordinate: [],
      sortType: 'Default'
    }
  },
  methods: {
    addChooseHandle (option, index, i) {
      // 使用set添加对象
      this.$set(this.choose, index, option)
      // 找到操作的一行，把这一行的数据中的index，设置为
      this.datalist[index].index = i
    },
    removeHandle (key) {
      this.$delete(this.choose, key)
      this.datalist[key].index = -1
    },
    getHotelList: function (type) {
      if (type === '1') {
        this.pager.page = 1
      }
      this.allData = []
      this.loading = true
      let ArrivalDate = this.searchData.ArrivalDate
      let DepartureDate = this.searchData.DepartureDate
      let QueryText = this.searchData.QueryText
      let CityId = this.cityId
      let Page = this.pager.page
      let Sort = this.sortType
      serverHttp.GetListPage({ArrivalDate, DepartureDate, CityId, ResultType: '1,2,3,4', QueryText, Page, Sort}).then(res => {
        let coordinate = []
        res.data.List.forEach(item => {
          let childArr = []
          item.Facilities = item.Facilities.split(',')
          childArr.push(item.Detail.Longitude)
          childArr.push(item.Detail.Latitude)
          childArr.push(item.Detail.Address)
          coordinate.push(childArr)
        })
        coordinate.sort()
        this.coordinate = coordinate
        this.pager.total = res.data.Count
        this.allData = res.data.List
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    GetDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      return y + '-' + m + '-' + d
    },
    toDetail (id) {
      let startDate = this.searchData.ArrivalDate
      let endDate = this.searchData.DepartureDate
      let Page = this.pager.page
      let CityId = this.cityId
      let routeData = this.$router.resolve({name: 'ylHotelListInfo', query: {id, startDate, endDate, Page, CityId}})
      window.open(routeData.href, '_blank')
    },
    selectCity (data) {
      this.cityId = data.RegionId
    },
    changePageTop (data) {
      this.pager.page = data
      this.getHotelList()
    },
    changePage (val) {
      this.pager.page = val
      this.getHotelList()
    },
    hotelSort (sort) {
      console.log(sort)
      this.sortType = sort.sort
      this.getHotelList()
    }
  },
  mounted () {
    this.searchData.ArrivalDate = this.GetDateStr(1)
    this.searchData.DepartureDate = this.GetDateStr(2)
    this.getHotelList()
  }
}
</script>
<style lang="scss">
  .hotelHome {
    width: 1200px;
    margin: 0 auto;

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
  }

  .mul-choice {
    width: 100%;
    height: auto;

    .option-list {
      margin-bottom: 15px;
      background-color: #fff;
      border-style: solid;
      border-color: #029a3c #e5e5e5 #e5e5e5;
      border-width: 2px 1px 1px;

      dl {
        border-bottom: 1px dashed #ddd;
        line-height: 45px;
        overflow: hidden;

        .option-title {
          float: left;
          padding-right: 20px;
          width: 78px;
          color: #888;
          text-align: right;
        }

        dd {
          float: left;
          overflow: hidden;
        }

        .option-item {
          margin-right: 15px;
          text-align: center;
        }

        .elect {
          padding: 3px 6px;
          background-color: #ff6d25;
          color: #ffffff;
        }

        .current {
          padding: 4px 10px 4px 6px;
          background: #fff;
          color: #555;
          border: 1px dashed #ff5704;
          margin-right: 20px;
        }
      }
    }
  }
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
          cursor: pointer;
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
            cursor: pointer;
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
