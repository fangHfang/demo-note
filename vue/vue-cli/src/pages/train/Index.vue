<template>
  <div class="train">
    <div class="index">
<!--      头部搜索-->
      <ul class="header">
        <li>
          <label>出发城市</label>
          <cityList :cityType="'form'" :defulteCity="formCity" @changeItem="selectCity"></cityList>
        </li>
        <li>
          <p class="change-image" @click="huanCity"></p>
        </li>
        <li>
          <label>到达城市</label>
          <cityList :cityType="'to'" :placeholderName="'到达城市'" :defulteCity="toCity" @changeItem="selectCity"></cityList>
        </li>
        <li>
          <label>出发日期</label>
          <el-date-picker
            v-model="TrainDate"
            type="date"
            placeholder="选择出发日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </li>
        <li>
          <el-button type="warning" @click="getList(TrainDate)" class="warning-btn search-btn">查询</el-button>
        </li>
      </ul>
      <div v-loading="loading">
  <!--      车次信息-->
        <div style="margin: 20px 0 30px" v-if="isShow">
          <span style="font-size: 22px">{{allData.fromStation}}</span>
          <i class="train-to"></i>
          <span style="font-size: 22px">{{allData.toStation}}</span>
          <span style="margin-left: 20px;">{{TrainDate}} (共{{allData.totalCount}}个车次)</span>
        </div>
  <!--      日期组件-->
        <calender :list="dateList" @chooseDate="selectWeek" v-if="isWeek"></calender>
  <!--      列表信息-->
        <div>
          <table width="100%">
            <tr style="height: 36px;background: #f0f0f0;">
              <th style="width: 100px;">车次</th>
              <th style="width: 160px;">出发/到达时间</th>
              <th style="width: 160px;">出发/到达车站</th>
              <th style="width: 160px;">耗时</th>
              <th>参考票价</th>
              <th style="width: 150px;">余票</th>
              <th style="width: 110px"></th>
            </tr>
          </table>
          <ul v-if="isShow" class="table-box">
            <li v-for="(item, index) in allData.trains" :key="index">
              <table style="width: 100%;">
                <tr>
                  <td style="width: 100px">
                    <p style="font-size: 28px;color: #333">{{item.trainNo}}</p>
                  </td>
                  <td style="width: 160px;">
                    <p class="from-time">{{item.fromTime}}</p>
                    <p class="to-time">{{item.toTime}}</p>
                  </td>
                  <td style="width: 160px;text-align: left">
                    <p><i class="place-icon from-icon"></i>{{item.fromStation}}</p>
                    <p><i class="place-icon to-icon"></i>{{item.toStation}}</p>
                  </td>
                  <td style="width: 160px">
                    <p>{{item.haoshi}}</p>
                  </td>
                  <td>
                    <p v-for="(child, indexIndex) in item.tickets" :key="indexIndex" style="overflow: hidden;line-height: 26px;">
                      <span style="width: 35%;display: inline-block;text-align: right;float: left">
                        <el-popover
                          v-if="child.type"
                          placement="top-end"
                          width="200"
                          trigger="hover">
                            <div class="showSeatInfo">
                              <div>
                                <div class="seatType">
                                  <span>硬卧上铺</span>
                                  <span>￥<i>129</i></span>
                                </div>
                                <div class="seatType">
                                  <span>硬卧下铺</span>
                                  <span>￥<i>174</i></span>
                                </div>
                              </div>
                              <div>
                                <span>互联网购票，卧铺上/中/下是随机分配的，暂收下铺价格，我们会优先为您占下铺，占座成功后，若有差价，会于1-7个工作日退回您的支付账户。</span>
                              </div>
                            </div>
                          <i class="seatInfo" slot="reference">{{child.seatName}}</i>
                        </el-popover>
                        <i v-else>{{child.seatName}}</i>
                      </span>
                      <span class="seat-type">￥ <i style="font-size: 20px;font-family: tahoma;">{{child.price}}</i>+5</span>
                    </p>
                  </td>
                  <td style="width: 150px;text-align: right;">
                    <p v-for="(child, indexIndex) in item.tickets" :key="indexIndex" style="overflow: hidden;line-height: 28px;margin-right: 55px">
                      <span v-if="child.seats&&child.seats!=='0'">余 <i style="color: #ff6802">{{child.seats}}</i>张</span>
                      <span v-else><i style="color: #ff6802">无票</i></span>
                    </p>
                  </td>
                  <td style="width: 110px">
                    <p v-for="(child, indexIndex) in item.tickets" :key="indexIndex" style="margin-bottom: 2px;">
                      <el-button v-if="child.seats&&child.seats!=='0'" size="small" type="warning" @click="toDetail(item)">订票</el-button>
                      <el-button v-else size="small" type="info">无票</el-button>
                    </p>
                  </td>
                </tr>
              </table>
            </li>
          </ul>
          <div class="noData" v-else>
            <img src="/static/noresult.png" alt="">
            <span>暂无相关信息</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/train'
import cityList from '@/components/cityhuoche'
import calender from '@/components/calender'
export default {
  name: 'index',
  components: {cityList, calender},
  data () {
    return {
      value: '1',
      TrainDate: '',
      input: '',
      dateList: [],
      allData: {},
      isShow: false,
      isWeek: false,
      loading: true,
      ToStation: 'beijing',
      FromStation: 'taiyuan',
      formCity: '太原',
      toCity: '北京'
    }
  },
  mounted () {
    this.TrainDate = this.GetDateStr(0)
    this.getList(this.TrainDate)
    this.getWeek()
  },
  methods: {
    getList (TrainDate, type) {
      this.allData = {}
      this.isShow = false
      this.loading = true
      TrainDate = TrainDate.replace(/-/g, '')
      if (type !== 1) {
        this.isWeek = false
        this.getWeek()
      }
      let FromStation = this.FromStation
      let ToStation = this.ToStation
      serverHttp.GetList({FromStation, ToStation, TrainDate}).then(res => {
        if (res.data) {
          this.isShow = true
          res.data.Data.trains.forEach(item => {
            item.haoshi = this.getTime(item.fromTime, item.toTime)
          })
          this.allData = res.data.Data
        }
        this.isWeek = true
        this.loading = false
      })
    },
    toDetail () {
      this.$router.push({path: '/huoche/detail'})
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
    getWeek () {
      let dateList = []
      for (let i = 0; i < 8; i++) {
        let date = this.GetDateStr(i, this.TrainDate)
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
    selectWeek (data) {
      this.getList(data.time, 1)
      this.TrainDate = data.time
    },
    selectCity (data) {
      if (data.cityType === 'form') {
        this.FromStation = data.stationCode
      } else {
        this.ToStation = data.stationCode
      }
    },
    huanCity () {
      let toCity = this.formCity
      this.formCity = this.toCity
      this.toCity = toCity
      let ToStation = this.FromStation
      this.FromStation = this.ToStation
      this.ToStation = ToStation
    }
  }
}
</script>

<style lang="scss">
  .train{
    background: #fff;
    padding: 20px 0;
    .index{
      width: 1200px;
      margin: 0 auto;
      .header {
        padding: 10px 20px;
        height: 55px;
        margin: 10px 0;
        line-height: 35px;
        background: #f5f5f5;
        box-sizing: border-box;
        li{
          float: left;
          margin-right: 30px;
          label{
            font-size: 14px;
            color: #333;
          }
          .change-image{
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
            &:hover{
              background-position: 0 -44px;
            }
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
      .from-time{
        font-size: 18px;
        padding: 7px 0;
      }
      .to-time{
        font-size: 12px;
        padding: 7px 0;
      }
      .train-to{
        background: url("/static/trainto.png") no-repeat;
        width: 33px;
        height: 6px;
        display: inline-block;
        margin: 10px 15px 0;
        vertical-align: top;
      }
      .table-box{
        width: 100%;
        margin-top: 10px;
        color: #666;
        overflow: hidden;
        .el-button--warning{
          background-color: #F60;
          border-color: #F60;
        }
        .el-button--warning.is-plain{
          background-color: #fff;
          color: #f38500;
          border-color: #ff9913;
        }
        li{
          margin-bottom: 10px;
          border: solid 1px #ddd;
          overflow: hidden;
          tr{
            height: 170px;
            td{
              padding: 0 10px;
              text-align: center;
              color: #333;
              vertical-align: middle;
              .el-button{
                height: 26px;
                box-sizing: border-box;
                line-height: 26px;
                padding: 0;
                width: 73px;
                text-align: center;
              }
              .seat-type{
                width: 65%;
                padding-left: 10px;
                float: left;
                display: inline-block;
                color: #FF6600;
                letter-spacing: 1px;
                text-align: left;
                box-sizing: border-box;
              }
              .seatInfo{
                color: #209ef6;
                border-bottom: 1px dashed #209ef6;
                cursor: help;
              }
            }
            .place-icon{
              width: 14px;
              height: 14px;
              vertical-align: middle;
              margin: 10px 5px 12px 50px;
              display: inline-block;
              background: url('/static/train-icon.png') no-repeat;
            }
            .from-icon{
              background-position: 0;
            }
            .middle-icon{
              background-position: -20px 0;
            }
            .to-icon{
              background-position: -40px 0;
            }
          }
          &:hover{
            border-color: #3aa400;
          }
        }
      }
      table{
        tr{
          th{
            padding: 0 10px;
            color: #666;
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
