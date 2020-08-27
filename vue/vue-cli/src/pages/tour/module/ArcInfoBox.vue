<template>
  <div class="ArcInfoBox">
    <div class="TourTitle">
      <h1>{{data.Detail.Name}}</h1>
    </div>
    <div class="TourBoxLeft">
      <div class="tourImg">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in data.Detail.Imgs" :key="index">
            <img :src="item" onerror="this.src = '/static/default.gif'" alt=""/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="tourDateBox">
        <ele-calendar @pick="clickpick" :render-content="renderContent" :lunarcalendar="true" :currentmonth="currentmonth" :disabledDate="disabledDate"
                      :prop="prop" @date-change="datechange" :border="true" :data="datedef">
<!--          <template slot-scope="slotProps">-->
<!--            {{ slotProps.todo.yearLabel}}{{ slotProps.todo.month}}-->
<!--          </template>-->
        </ele-calendar>
      </div>
    </div>
    <div class="TourBoxRight">
      <div class="info1">
        <div class="item"><label>出发地区：</label>{{data.Detail.ChuFaDi}}</div>
        <div class="item action bdsharebuttonbox bdshare-button-style0-16" data-bd-bind="1562226079547">
          <span style="margin-right: 10px;"> <i class="el-icon-star-off"
                                                style="font-size: 16px;vertical-align: middle"></i> 收藏线路</span>
          <span><i class="el-icon-share" style="font-size: 16px;vertical-align: middle"></i> 立即分享<a href="#"
                                                                                                    class="bds_more"
                                                                                                    data-cmd="more"
                                                                                                    style="float: right;width: 60px;margin-left: -70px;opacity: 0"></a></span>
        </div>
      </div>
      <div class="info2 clearfix">
        <div class="price"><em>¥</em><strong>{{data.Detail.Price}}</strong>起/人</div>
      </div>
      <div class="info3 info34 clearfix">
        <dl class="w290">
          <dt>购物：</dt>
          <dd><em>{{data.Detail.GouWu}}</em>个购物点</dd>
        </dl>
        <dl class="w290">
          <dt>自费：</dt>
          <dd><em>{{data.Detail.ZiFei}}</em>个自费点</dd>
        </dl>
        <dl class="w290">
          <dt>交通方式：</dt>
          <dd>{{data.Detail.ChuFaType}}<span>-</span>{{data.Detail.FanHuiType}}</dd>
        </dl>
        <dl class="w290">
          <dt>出游天数：</dt>
          <dd>{{data.Detail.DayNum}}天{{data.Detail.NightNum}}晚</dd>
        </dl>
        <dl>
          <dt>目<em>的</em>地：</dt>
          <dd style="position:relative;margin-left:50px;display:block;">{{data.Detail.MuDiDi}}</dd>
        </dl>
      </div>
      <div class="info3 clearfix" v-if="data.Detail.GongYingShang" style="background: #f6f6f6;margin-top: 10px">
        <dl>
          <dt>供应商：</dt>
          <dd>{{data.Detail.GongYingShang}}</dd>
        </dl>
        <dl>
          <dt>负责人：</dt>
          <dd>{{data.Detail.FuZeRen ? data.Detail.FuZeRen.Name : ''}}</dd>
        </dl>
        <dl>
          <dt>服务热线：</dt>
          <dd>{{data.Detail.FuZeRen ? data.Detail.FuZeRen.Telephone : ''}}</dd>
        </dl>
      </div>
      <div class="info5 clearfix">
        <div class="formitem clearfix">
          <label>出发日期：</label>
          <div class="formbox chu_day">{{date}}</div>
          <span class="trip">提示：至少提前{{data.Detail.TiQianDays}}天预定，截止时间{{data.Detail.TiQianTime}}</span>
        </div>
<!--        <div class="person-list">-->
<!--          <label>儿童：</label>-->
<!--          <el-input-number v-model="submitData.child" :min="1" :max="10" label="描述文字"></el-input-number>-->
<!--          <span>￥500/人</span>-->
<!--          <span>描述: 2周岁以下</span>-->
<!--        </div>-->
<!--        <div class="person-list">-->
<!--          <label>成人：</label>-->
<!--          <el-input-number v-model="submitData.person" :min="1" :max="10" label="描述文字"></el-input-number>-->
<!--          <span>￥2000/人</span>-->
<!--          <span>描述: 普通</span>-->
<!--        </div>-->
<!--        <div class="person-list">-->
<!--          <label>其他：</label>-->
<!--          <el-input-number v-model="submitData.other" :min="1" :max="10" label="描述文字"></el-input-number>-->
<!--          <span>￥100/人</span>-->
<!--          <span>描述: 小费</span>-->
<!--        </div>-->
        <div class="Btninfo">
          <button class="order yuding" type="button" @click="toOrder"><i></i>立即预定</button><span style="color: #999;font-size: 14px;">同行价</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
import serverHttp from '@/assets/common/tour'

export default {
  name: 'ArcInfoBox',
  components: {
    eleCalendar
  },
  props: {
    data: {}
  },
  data () {
    return {
      date: this.getDate(),
      submitData: {
        person: '',
        child: '',
        other: ''
      },
      prop: 'date',
      timeout: '',
      datedef: [
        // {'date': '2018-06-30', 'content': '5000', 'cid': null},
        // {'date': '2018-06-26', 'content': null, 'cid': null}
      ],
      switchmonth: false,
      currentmonth: true,
      checked: '',
      dialogVisible: false,
      value1: '',
      highlight: true,
      value: []
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.setShare()
    }, 0)
  },
  created () {
  },
  watch: {
    data () {
      let arr = []
      if (this.data.Price.length) {
        this.data.Price.forEach(v => {
          v.content = v.Price
          v.date = v.Date
          arr.push(v)
        })
        this.datedef = arr
      }
    }
  },
  methods: {
    disabledDate (val) {
      // console.log(val)
      // return true
    },
    selecthald (val, selectDom) {
      let _this = this
      setTimeout(function () {
        let arr = []
        if (this.data.Price.length) {
          this.data.Price.forEach(v => {
            v.content = v.Price
            v.date = v.Date
            arr.push(v)
          })
          this.datedef = arr
        }
        _this.value = []
      }, 3000)
    },
    renderContent (h, parmas) {
      const loop = data => {
        return (
          data.defvalue.value ? (<div style="height: 60px;"><p> {data.defvalue.text} </p>
            <p>{'￥' + data.defvalue.value.content}</p></div>) : <div style="height: 60px;"><p>{data.defvalue.text}</p></div>)
      }
      return (<div>{loop(parmas)}</div>)
    },
    append (parmas) {
      console.log(parmas.defvalue)
    },
    datechange (val) {
      let date = new Date(val)
      let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
      let days = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      this.date = date.getFullYear() + '-' + month + '-' + days
      serverHttp.GetPriceData({
        ResourceId: this.$route.query.id,
        Year: date.getFullYear(),
        Month: date.getMonth() + 1
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          let arr = []
          if (this.data.Price.length) {
            this.data.Price.forEach(v => {
              v.content = v.Price
              v.date = v.Date
              arr.push(v)
            })
            this.datedef = arr
            this.value = []
          }
        } else {
          this.datedef = []
          this.$message.error(res.msg)
        }
      })
    },
    clickpick (value, event, row, celltd) {
      let date = new Date(value)
      let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
      let days = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      this.date = date.getFullYear() + '-' + month + '-' + days
    },
    setShare () {
      // 分享相关代码
      window._bd_share_config = {
        'common': {
          'bdSnsKey': {},
          'bdText': '',
          'bdMini': '1',
          'bdMiniList': false,
          'bdPic': '',
          'bdStyle': '1',
          'bdSize': '16'
        },
        'share': {},
        'selectShare': {
          'bdContainerClass': null,
          'bdSelectMiniList': ['sqq', 'qzone', 'tsina']
        }
      }
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)
      document.body.appendChild(s)
    },
    toOrder () {
      localStorage.setItem('updateInfo', '')
      this.$router.push({name: 'tourOrder', query: {date: this.date, id: this.$route.query.id, Imid: this.$route.query.Imid}})
    },
    getDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentDate = year + seperator1 + month + seperator1 + strDate
      return currentDate
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
      }
    }

    .TourBoxLeft {
      width: 540px;
      float: left;

      .tourImg {
        width: 100%;

        .el-carousel__item img {
          width: 100%;
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
        padding-top: 10px;
        padding-left: 20px;
        padding-bottom: 10px;
        background: #fcf9ee;
        color: #999;
        border-top: 1px dotted #ddd;

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
          }
        }
      }

      .info5 {
        position: relative;
        margin-top: 10px;
        padding: 20px;
        background: #fffaee;
        border: 1px solid #f9af6e;
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
          margin-bottom: 10px;
        }

        .trip {
          margin-left: 20px;
          line-height: 32px;
          font-size: 12px;
          color: #f60;
        }

        .person-list {
          margin: 10px auto;
          float: left;

          span:nth-child(3) {
            margin-left: 20px;
            line-height: 32px;
            color: #f60;
            font-size: 14px;
          }

          span:last-child {
            margin-left: 10px;
            color: #666;
            line-height: 32px;
          }
        }

        .Btninfo {
          width: 100%;
          text-align: center;
          float: left;
          margin-top: 20px;

          button {
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
        }
      }
    }
  }
</style>
