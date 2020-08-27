<template>
  <div class="planeSearch">
    <div class="planeSearch-Index">
      <ul class="header">
        <li>
          <label>类型</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li v-if="value==='1'">
          <label>航班号</label>
          <el-input style="width: 235px" v-model="input" placeholder="如CA111或1111"></el-input>
        </li>
        <li v-if="value==='2'">
          <label>出发地</label>
          <cityList></cityList>
        </li>
        <li v-if="value==='2'">
          <p class="change-image"></p>
        </li>
        <li v-if="value==='2'">
          <label>到达地</label>
          <cityList></cityList>
        </li>
        <li>
          <label>出发日期</label>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
        </li>
        <li>
          <el-button type="warning" class="warning-btn search-btn">查询</el-button>
        </li>
      </ul>
      <div>
        <table width="100%">
          <tr style="height: 36px;background: #f0f0f0;">
            <th style="width: 260px;">航班信息</th>
            <th style="width: 215px;text-align: right;">起飞时间</th>
            <th style="width: 210px"></th>
            <th style="width: 215px;text-align: left;">到达时间</th>
            <th style="width: 100px">餐食</th>
            <th style="width: 200px">价格</th>
          </tr>
        </table>
        <ul v-if="listData.length" class="table-box">
          <li v-for="(item, index) in listData" :key="index">
            <table style="width: 100%;">
              <tr>
                <td style="width: 260px">
                  <p style="font-size: 14px;font-weight: 700;color: #4D4D4D">{{item.type}}{{item.num}}</p>
                  <p>{{item.num2}}</p>
                </td>
                <td style="text-align: right;width: 215px">
                  <p class="time">{{item.startDate}}</p>
                  <p>{{item.startPlace}}</p>
                </td>
                <td style="width: 210px;">
                  <p style="margin-top: 20px;color: #999;">2小时10分</p>
                  <p class="flightTime"></p>
                </td>
                <td style="text-align: left;width: 215px">
                  <p class="time">{{item.endDate}}</p>
                  <p>{{item.endPlace}}</p>
                </td>
                <td style="width: 100px">
                  <p>{{item.isEat}}</p>
                </td>
                <td style="width: 200px">
                  <p><span style="color: #FF6600;font-size: 14px;">￥<i style="font-size: 28px;font-family: tahoma;">{{item.price}}</i></span> 起</p>
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
</template>

<script>
import cityList from '@/components/cityList'
export default {
  name: 'index',
  components: {cityList},
  data () {
    return {
      options: [{
        value: '1',
        label: '按航班号'
      }, {
        value: '2',
        label: '按起降地'
      }],
      value: '1',
      value1: '',
      input: '',
      listData: [
        {date: '2019-07-13', type: '中国东方航空公司', num: 'MU5233', num2: '73L', startDate: '07:30', showMore: false, endDate: '09:40', startPlace: '太原武宿机场T2', endPlace: '成都双流机场T2', isEat: '有', price: '670', child: [{num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}]},
        {date: '2019-07-13', type: '海南航空公司', num: 'MU5233', num2: '73L', startDate: '07:30', showMore: false, endDate: '09:40', startPlace: '太原武宿机场T2', endPlace: '成都双流机场T2', isEat: '有', price: '670', child: [{num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}, {num: 'P', percent: '30%', price: '670', remindOf: '1'}]}
      ]
    }
  }
}
</script>

<style lang="scss">
  .planeSearch {
    background: #fff;
    padding: 10px 0;
    min-height: 500px;
    .planeSearch-Index {
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
          .el-select {
            width: 122px;
            height: 31px;
            margin-left: 10px;

            .el-input__inner {
              height: 31px;
              &:focus{
                border-color: #3aa400;
              }
            }

            .el-input__icon {
              height: 31px;
              line-height: 31px;
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
      .time{
        font-size: 24px;
        color: #4D4D4D
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
            height: 88px;
            td{
              padding: 0 10px;
              text-align: center;
              color: #4D4D4D;
            }
          }
          .flightTime{
            background: url("/static/flight_arrow.png") no-repeat bottom right;
            width: 110px;
            height: 40px;
            margin-top: -25px;
            display: inline-block;
          }
          .moreList{
            section{
              padding: 15px 0;
              padding-left: 218px;
              span{
                display: inline-block;
              }
              .updateOrder{
                border-bottom: 1px dashed #005bb5;
                color: #005bb5;
                margin-left: 15px;
                cursor: help;
              }
              .preferential{
                width: 180px;
                padding-right: 150px;
                text-align: right;
                color: #999;
              }
              .orderPrice{
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
