<template>
  <div class="ArcInfoBox">
    <div class="TourTitle">
      <h1>{{detail.Detail.HotelName?detail.Detail.HotelName:''}} <i>【四星级】</i></h1>
    </div>
    <div class="TourBoxLeft">
      <div class="tourImg">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img :src="detail.Detail.ThumbNailUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="TourBoxRight">
      <div class="info1">
        <div class="item"><label>酒店编号：</label>{{detail.HotelId}}</div>
        <div class="item region"><label>服务热线：</label>{{detail.Detail.Phone}}</div>
      </div>
      <div class="info2 clearfix">
        <div class="price"><strong>{{detail.LowRate ? '￥' + detail.LowRate:'请咨询'}}</strong></div>
      </div>
      <div class="info3 info34 clearfix">
        <dl>
          <dt>酒店地址：</dt>
          <dd>{{detail.Detail.Address}} <span><i class="el-icon-location-outline"></i>查看地图</span></dd>
        </dl>
        <dl>
          <dt>入住时间：</dt>
          <dd>{{startDate}}</dd>
        </dl>
        <dl>
          <dt>离店时间：</dt>
          <dd>{{endDate}}</dd>
        </dl>
        <dl>
          <dt>服务项目：</dt>
          <dd><i v-for="(item, index) in detail.Facilities" :key="index">{{fuwuList[item]}}、</i></dd>
        </dl>
      </div>
      <div class="info5 clearfix">
        <div class="Btninfo">
          <el-button type="warning" plain icon="el-icon-star-off">收藏酒店</el-button>
          <el-button type="warning" icon="el-icon-position" @click="toOrder">立即预定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'

export default {
  name: 'ArcInfoBox',
  components: {
    eleCalendar
  },
  props: ['detail'],
  created () {
    this.startDate = this.$route.query.startDate
    this.endDate = this.$route.query.endDate
  },
  data () {
    return {
      topHeight: 0,
      fuwuList: ['', '免费wifi', '收费wifi', '免费宽带', '收费宽带', '免费停车场', '收费停车场', '免费接机服务', '收费接机服务', '室内游泳池', '室外游泳池', '健身房', '商务中心', '会议室', '酒店餐厅', '叫醒服务', '行李寄存', '双床', '大床'],
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    toOrder () {
      this.topHeight = document.querySelector('.MainLeft').offsetTop
      window.scrollTo({
        'behavior': 'smooth',
        'top': this.topHeight
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .ArcInfoBox {
    position: relative;
    padding: 20px;
    margin: 20px 0;
    background: #fff;
    border: 1px solid #e5e5e5;
    overflow: hidden;

    .TourTitle {
      line-height: 33px;
      margin-bottom: 20px;

      h1 {
        font-size: 24px;
        font-weight: normal;

        i {
          color: #999;
          font-size: 18px;
        }
      }
    }

    .TourBoxLeft {
      width: 540px;
      float: left;

      .tourImg {
        width: 100%;

        .el-carousel__item img {
          width: 540px;
          height: 360px;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
      }

      .tourDateBox {
        margin-top: 15px;
      }
    }

    .TourBoxRight {
      width: 600px;
      float: right;

      .info1 {
        padding: 0 8px;
        height: 35px;
        color: #8c8c8c;
        border-bottom: 1px dotted #ddd;

        .item {
          position: relative;
          float: left;
          line-height: 26px;
        }

        .region {
          margin-left: 30px;
          padding-left: 30px;
        }

        .region:before {
          position: absolute;
          top: 2px;
          left: 0;
          content: '';
          height: 17px;
          width: 1px;
          background: #ddd;
        }

        .bdsharebuttonbox {
          float: right;
          margin-left: 30px;
          padding-left: 30px;

          .router-link-active {
            color: #8c8c8c;

            i {
              color: #8cc06e;
            }
          }
        }
      }

      .info2 {
        position: relative;
        margin-top: 10px;
        padding-left: 20px;
        background: #fcf9ee;
        overflow: hidden;
        color: #999;

        .price {
          float: left;
          height: 75px;
          line-height: 75px;

          em {
            color: #f60;
            font-size: 23px;
          }

          strong {
            margin: 0 6px;
            color: #f60;
            font-size: 36px;
            font-weight: 500;
          }
        }
      }

      .info3 {
        overflow: hidden;
        margin-top: 10px;
        padding: 15px 10px 15px 20px;
        background: #f6f6f6;
        color: #999;

        .w290 {
          float: left;
          width: 290px;
        }

        dl {
          line-height: 38px;

          dt {
            float: left;
            color: #666;
          }

          dd {
            display: inline-block;
            color: #999;
            font-size: 14px;

            em {
              margin: 0 2px 0 0;
              color: #ff5308;
              font-weight: 700;
            }

            span {
              display: inline-block;
              margin-left: 10px;
              width: 90px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              background: #fff;
              color: #333;
              font-size: 12px;
              border: 1px solid #e0e0e0;
              border-radius: 14px;
              cursor: pointer;

              .el-icon-location-outline {
                color: #2e9900;
                font-size: 16px;
                vertical-align: middle;
                margin-left: -3px;
                margin-top: -3px;
              }

              &:hover {
                border-color: #2e9900;
              }
            }
          }
        }
      }

      .info5 {
        position: relative;
        margin-top: 10px;
        padding: 20px;
        overflow: hidden;

        label {
          float: left;
          padding-right: 10px;
          width: 70px;
          line-height: 35px;
          text-align: right;
          color: #666;
          font-size: 14px;
        }

        .formbox {
          position: relative;
          float: left;
          line-height: 35px;
          font-weight: bold;
          font-size: 16px;
        }

        .trip {
          margin-left: 20px;
          line-height: 32px;
          font-size: 12px;
          color: #f60;
        }

        .Btninfo {
          width: 100%;
          text-align: center;

          .el-button--warning {
            position: relative;
            margin: 0 10px 0;
            width: 160px;
            height: 43px;
            line-height: 43px;
            color: #fff;
            font-size: 20px;
            border: none;
            cursor: pointer;
            background: #ff5704;
          }

          .is-plain {
            background: #ffe4d0;
            border: 1px solid #f0cab6;
            color: #e5511d;
          }
        }
      }
    }
  }
</style>
