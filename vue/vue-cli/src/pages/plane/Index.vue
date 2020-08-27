<template>
  <div class="plane">
    <div class="index">
      <ul class="header">
        <li>
          <label>出发城市</label>
          <cityList @changeItem="changeItem" :cityType="'form'" :defulteCity="formCity"></cityList>
        </li>
        <li>
          <p class="change-image" @click="huanCity"></p>
        </li>
        <li>
          <label>到达城市</label>
          <cityList @changeItem="changeItem" :cityType="'to'" :placeholderName="'到达城市'" :defulteCity="toCity"></cityList>
        </li>
        <li>
          <label>出发日期</label>
          <el-date-picker
            v-model="Airdate"
            type="date"
            placeholder="选择出发日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </li>
        <li>
          <el-button type="warning" class="warning-btn search-btn" @click="getList(Airdate)">查询</el-button>
        </li>
      </ul>
      <calender :list="dateList" @chooseDate="selectWeek" v-if="isWeek"></calender>
      <Mulchoice :datalist="datalist"  @jipiaoSort="jipiaoSort"></Mulchoice>
      <div v-loading="loading">
        <table width="100%">
          <tr style="height: 36px;background: #f0f0f0;">
            <th style="width: 260px;">航班信息</th>
            <th style="width: 160px;text-align: right;">起飞时间</th>
            <th style="width: 210px"></th>
            <th style="width: 160px;text-align: left;">到达时间</th>
            <th style="width: 50px">餐食</th>
            <th style="width: 260px">价格</th>
            <th style="width: 100px"></th>
          </tr>
        </table>
        <ul v-if="isShow" class="table-box">
          <li v-for="(item, index) in allData.flight" :key="index">
            <table style="width: 100%;">
              <tr>
                <td style="width: 260px">
                  <p style="font-size: 14px;font-weight: 700;color: #4D4D4D">{{item.airlines_name}}{{item.aircode}}{{item.flightnum}}</p>
                  <p>{{item.equip}}</p>
                </td>
                <td style="text-align: right;width: 160px">
                  <p class="time">{{item.depart}}</p>
                  <p>{{item.departcityName?item.departcityName:allData.AIR.depart_city}}</p>
                </td>
                <td style="width: 210px;">
                  <p style="margin-top: 20px;color: #999;">{{item.haoshi}}</p>
                  <p class="flightTime"></p>
                </td>
                <td style="text-align: left;width: 160px">
                  <p class="time">{{item.arrive}}</p>
                  <p>{{item.arrivecityName?item.arrivecityName:allData.AIR.arrive_city}}</p>
                </td>
                <td style="width: 50px">
                  <p>{{item.food=='-'?'无':'有'}}</p>
                </td>
                <td style="width: 260px">
                  <p><span style="color: #FF6600;font-size: 14px;">￥<i style="font-size: 28px;font-family: tahoma;">{{item.class1.seat[item.class1.seat.length-1].price}}</i></span>
                    起</p>
                </td>
                <td style="width: 100px">
                  <p>
                    <el-button type="warning" size="small" v-if="!item.showMore" @click="toOrder(item, index, true)">
                      订票<i class="el-icon-caret-bottom"></i></el-button>
                    <el-button type="warning" size="small" v-else plain @click="toOrder(item, index, false)">收起<i
                      class="el-icon-caret-top"></i></el-button>
                  </p>
                </td>
              </tr>
            </table>
            <div class="moreList" v-if="item.showMore">
              <section v-for="(child, childIndex) in item.class1.seat" :key="childIndex">
                  <span style="width: 320px">{{child.code}}
                  <el-popover
                    placement="bottom-end"
                    width="400"
                    trigger="hover">
                    <ul class="showNotice">
                      <li>
                        <label>改签规定</label>
                        <p>{{child.cmt}}</p>
                      </li>
                      <li>
                        <label>退票规定</label>
                        <p>{{child.refund}}</p>
                      </li>
                      <li>
                        <label>签注信息</label>
                        <p>{{child.ei}}</p>
                      </li>
                    </ul>
                    <span class="updateOrder" slot="reference">退改签</span>
                  </el-popover>
                  </span>
                <span class="preferential">{{child.discount}}折</span>
                <span class="orderPrice">￥{{child.price}}</span>
                <el-button type="warning" size="small" @click="toDetail(child)">预定<i class="el-icon-caret-bottom"></i>
                </el-button>
                <span style="color: #b00">{{child.status.search(/[A-Z]/)===-1?'仅剩'+child.status+'张':'无'}}</span>
              </section>
            </div>
          </li>
        </ul>
        <div class="noData" v-else>
          <img src="/static/noresult.png" alt="">
          <span>暂无相关信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/jipiao'
import cityList from '@/components/cityJipiao'
import calender from '@/components/calender'
import Mulchoice from '@/components/jiPiaoMulchoice'

export default {
  name: 'index',
  components: {cityList, calender, Mulchoice},
  data () {
    return {
      value: '1',
      input: '',
      dateList: [],
      datalist: [
        {
          title: '航空公司',
          list: [
            '不限',
            '四川航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '云南祥鹏航空公司',
            '中国国际航空公司'
          ],
          Index: 0
        },
        {
          title: '舱位',
          list: [
            '所有舱位',
            '经济舱',
            '头等/公务舱'
          ],
          Index: 0
        }
      ],
      allData: {},
      isShow: false,
      cityCode: 'PEKSYX',
      Airdate: '2019-09-25',
      isWeek: false,
      loading: true,
      formCity: '北京',
      toCity: '三亚',
      order_by: '',
      order_type: ''
    }
  },
  mounted () {
    this.getList(this.Airdate)
    this.getWeek()
  },
  methods: {
    toOrder (item, index, value) {
      this.$set(this.allData.flight[index], 'showMore', value)
    },
    toDetail () {
      this.$router.push({path: '/jipiao/detail'})
    },
    getHangKong () {
      serverHttp.GetAirlineEnum({}).then(res => {
        console.log(res)
      })
    },
    getCangWei () {
      serverHttp.GetClassType({}).then(res => {
        console.log(res)
      })
    },
    getList (Airdate, type) {
      let Trip = this.cityCode
      if (type !== 1) {
        this.isWeek = false
        this.getWeek()
      }
      this.isShow = false
      this.loading = true
      serverHttp.GetJiPiaoListPage({Trip, Air_date: Airdate.replace(/-/g, '.'), Order_type: this.order_type, Order_by: this.order_by}).then(res => {
        this.isWeek = true
        if (res.data) {
          this.isShow = true
          res.data.flight.forEach(item => {
            item.showMore = false
            item.depart = item.depart.slice(0, 2) + ':' + item.depart.slice(2)
            item.arrive = item.arrive.slice(0, 2) + ':' + item.arrive.slice(2)
            item.haoshi = this.getTime(item.depart, item.arrive)
          })
          this.allData = res.data
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getTime (start, end) {
      let fen = ''
      let shi = ''
      if ((end.split(':')[1] * 1) >= (start.split(':')[1] * 1)) {
        fen = (end.split(':')[1] * 1) - (start.split(':')[1] * 1)
        if ((end.split(':')[0] * 1) >= (start.split(':')[0] * 1)) {
          shi = (end.split(':')[0] * 1) - (start.split(':')[0] * 1)
        } else {
          shi = ((end.split(':')[0] * 1) + 24) - (start.split(':')[0] * 1)
        }
      } else {
        fen = (60 + (end.split(':')[1] * 1)) - (start.split(':')[1] * 1)
        if ((end.split(':')[0] * 1) >= (start.split(':')[0] * 1)) {
          shi = ((end.split(':')[0] * 1) - 1) - (start.split(':')[0] * 1)
        } else {
          shi = ((end.split(':')[0] * 1) + 23) - (start.split(':')[0] * 1)
        }
      }
      return shi + '小时' + fen + '分'
    },
    // 选择城市
    changeItem (data) {
      if (data.cityType === 'form') {
        this.cityCode = data.cityCode + this.cityCode.slice(3)
        this.formCity = data.cityName
      } else {
        this.cityCode = this.cityCode.slice(0, 3) + data.cityCode
        this.toCity = data.cityName
      }
    },
    getWeek () {
      let dateList = []
      for (let i = 0; i < 8; i++) {
        let date = this.GetDateStr(i, this.Airdate)
        var week = new Date(date).getDay()
        if (week === 0) {
          week = '星期日'
        } else if (week === 1) {
          week = '星期一'
        } else if (week === 2) {
          week = '星期二'
        } else if (week === 3) {
          week = '星期三'
        } else if (week === 4) {
          week = '星期四'
        } else if (week === 5) {
          week = '星期五'
        } else if (week === 6) {
          week = '星期六'
        }
        dateList.push({time: date, day: week})
      }
      this.dateList = dateList
    },
    GetDateStr (AddDayCount, selectDate = '') {
      var dd = ''
      if (selectDate) {
        dd = new Date(selectDate)
      } else {
        dd = new Date()
      }
      dd.setDate(dd.getDate() + AddDayCount)
      var y = dd.getFullYear()
      var m = (dd.getMonth() + 1) <= 9 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)
      var d = dd.getDate() <= 9 ? '0' + dd.getDate() : dd.getDate()
      return y + '-' + m + '-' + d
    },
    selectWeek (data) {
      this.getList(data.time, 1)
      this.Airdate = data.time
    },
    huanCity () {
      let formCity = this.formCity
      this.formCity = this.toCity
      this.toCity = formCity
      this.cityCode = this.cityCode.slice(3) + this.cityCode.slice(0, 3)
    },
    jipiaoSort (data) {
      this.order_by = data.byType
      this.order_type = data.type
      this.getList(this.Airdate, 1)
    }
  }
}
</script>

<style lang="scss">
  .plane {
    background: #fff;
    padding: 20px 0;

    .index {
      width: 1200px;
      margin: 0 auto;

      .header {
        padding: 10px 20px;
        height: 55px;
        margin: 10px 0;
        line-height: 35px;
        background: #f5f5f5;
        box-sizing: border-box;

        li {
          float: left;
          margin-right: 30px;

          .change-image {
            position: relative;
            display: inline-block;
            text-align: center;
            width: 52px;
            height: 30px;
            margin: 2.5px 20px;
            padding: 0;
            overflow: hidden;
            cursor: pointer;
            background: url("/static/ticket.png") no-repeat;
            background-position: 0 0;

            &:hover {
              background-position: 0 -44px;
            }

          }

          label {
            font-size: 14px;
            color: #333;
          }

          .el-select {
            width: 122px;
            height: 31px;
            margin-left: 10px;

            .el-input__inner {
              height: 31px;

              & :focus {
                border-color: #3aa400;
              }

            }

            .el-input__icon {
              height: 31px;
              line-height: 31px;
            }

          }

          .el-input {
            width: 122px;
            height: 31px;
            margin-left: 10px;

            .el-input__inner {
              height: 31px;

              & :focus {
                border-color: #3aa400;
              }

            }
          }

          .el-date-editor {
            width: 150px;
            height: 31px;
            margin-left: 10px;

            .el-input__inner {
              height: 31px;
            }

            .el-input__icon {
              line-height: 31px;
            }

          }

          .search-btn {
            padding: 6px 15px;
          }

        }
      }

      .viewsHome .mul-choice .option-list {
        border-top-color: #fff;
      }

      .time {
        font-size: 24px;
        color: #4D4D4D
      }

      .table-box {
        width: 100%;
        margin-top: 10px;
        color: #666;
        overflow: hidden;

        .el-button--warning {
          background-color: #F60;
          border-color: #F60;
        }

        .el-button--warning.is-plain {
          background-color: #fff;
          color: #f38500;
          border-color: #ff9913;
        }

        li {
          margin-bottom: 10px;
          border: solid 1px #ddd;
          overflow: hidden;

          tr {
            height: 88px;

            td {
              padding: 0 10px;
              text-align: center;
              color: #4D4D4D;
            }

          }

          .flightTime {
            background: url("/static/flight_arrow.png") no-repeat bottom right;
            width: 110px;
            height: 40px;
            margin-top: -25px;
            display: inline-block;
          }

          .moreList {

            section {
              padding: 15px 0;
              padding-left: 218px;

              span {
                display: inline-block;
              }

              .updateOrder {
                border-bottom: 1px dashed #005bb5;
                color: #005bb5;
                margin-left: 15px;
                cursor: help;
              }

              .preferential {
                width: 180px;
                padding-right: 150px;
                text-align: right;
                color: #999;
              }

              .orderPrice {
                width: 180px;
                color: #f60;
                font-size: 18px;
                font-family: tahoma;
              }

            }
          }

          &:hover{
            border-color: #3aa400;
          }

        }
      }

      table {

        tr {

          th {
            padding: 0 10px;
            color: #666;
            font-size: 14px;
            font-weight: normal;
          }

        }
      }
    }
  }
  .SearchPrices{
    left: 270px !important;
  }
</style>
