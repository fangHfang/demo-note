<template>
  <div class="Main">
    <div class="tabList">
      <el-tabs type="border-card" v-model="activeName" :class="[{'isFixed': isFixed === true}]"
               @tab-click="handleClick">
        <el-tab-pane :label="item" :name="item" v-for="(item, index) in navList" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon1"></i>
          </div>
          <div class="ItemTitle">产品说明<p>Special</p></div>
          <div class="ItemInfo">
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.ChanPinTeSe" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon2"></i>
          </div>
          <div class="ItemTitle">行程说明<p>Scheduling</p></div>
          <div class="ItemInfo" style="margin-left: 0">
            <div class="detail">
              <div class="block" style="margin-left: 0">
                <div v-if="data.Detail.XingChengType === 1" class="table" v-html="data.Detail.JianHuaXingCheng"></div>
                <div class="table_list" v-else>
                  <section class="dayDeast" v-if="data.Detail.XingCheng.length>0" v-for="(val,index) in data.Detail.XingCheng" :key="index">
                    <section class="day_title">
                      <p style="font-size: 28px;width: 45px;">D{{val.day}}</p>
                      <p style="margin-left: 60px;font-size: 22px;color: #333;">{{val.details[0].Name}}</p>
                    </section>
                    <section class="day_list" v-for="(item,ind) in val.details" :key="ind">
                      <section>
                        <section style="font-size: 18px;color: #333;line-height: 40px;padding-left: 105px;">
                          {{item.Hour}} : {{item.Minute}} {{item.TypeName}}
                          {{item.Name}}
                        </section>
                        <section style="font-size: 14px;color: #333;line-height: 20px;margin: 2px 0 10px;padding-left: 105px;" class="remark" v-if="item.Remark">
                          {{item.Remark}}
                        </section>
                        <section style="padding-left: 105px" class="pic" v-for="(value, index) in item.Imgs" :key="index">
                          <img :src="value" alt="" onerror="this.src ='/static/default.gif';"
                               style="width: 214px;margin: 2px 0;">
                        </section>
                      </section>
                    </section>
                  </section>
                  <div class="noData" v-if="XingCheng.length==0">
                    <text>暂无数据</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon3"></i>
          </div>
          <div class="ItemTitle">预定须知<p>Booking</p></div>
          <div class="ItemInfo">
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.YuDingXuZhi" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon4"></i>
          </div>
          <div class="ItemTitle">温馨提示<p>Reminder</p></div>
          <div class="ItemInfo">
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.WenXinTiShi" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon5"></i>
          </div>
          <div class="ItemTitle">证件说明<p>Certificates</p></div>
          <div class="ItemInfo">
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.ZhengJianShuoMing" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-text">
        <div class="main-item">
          <div class="ItemIcon">
            <i class="icon icon6"></i>
          </div>
          <div class="ItemTitle">费用说明<p>Expense</p></div>
          <div class="ItemInfo Itemprice">
            <span class="itemBtn">费用包含</span>
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.FeiYongBaoHan" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
          <div class="ItemInfo Itemprice">
            <span class="itemBtn">费用不含</span>
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.FeiYongBuHan" :key="index"><label>【{{item.Type}}】</label>{{item.Name}}</p>
            </div>
          </div>
          <div class="ItemInfo Itemprice">
            <span class="itemBtn">自费景点</span>
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.ZiFeiJingDian" :key="index"><label>【{{item.Name}}】</label><br/>{{item.Remark}}</p>
            </div>
          </div>
          <div class="ItemInfo Itemprice">
            <span class="itemBtn">购物点</span>
            <div class="detail">
              <p class="detail-cell" v-for="(item, index) in data.Detail.GouWuDian" :key="index"><label>【{{item.Name}}】</label><br/>{{item.Remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      activeName: '产品说明',
      is_fixed: false,
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }],
      navList: ['产品说明', '行程介绍', '预定须知', '温馨提示', '证件说明', '费用说明'],
      topHeight: 0,
      isFixed: false,
      itemArr: [],
      XingCheng: [
        {
          'AnPai': [
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            }
          ],
          'Num': 0
        },
        {
          'AnPai': [
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            }
          ],
          'Num': 0
        },
        {
          'AnPai': [
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            },
            {
              Decs: '用餐地点：cesdd     1dd21d12d',
              Hour: '00',
              IconClass: '',
              Minute: '00',
              Name: '测试',
              Pics: ['http://192.168.253.235:8088/upload/ShowImg.ashx?id=65d3664a43f04f9c94caed00a79a2bb7'],
              Remark: '测试',
              Time: 0,
              Title: '1dd21d12d',
              Type: '用餐',
              TypeId: 1
            }
          ],
          'Num': 0
        }
      ]
    }
  },
  props: {
    data: {}
  },
  created () {
    this.$nextTick(function () {
      this.topHeight = document.querySelector('.tabList').offsetTop - 2
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * 滚轮
     */
    handleScroll () {
      var that = this
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= that.topHeight) {
        that.isFixed = true
      } else {
        that.isFixed = false
      }

      let el = document.querySelectorAll('.nav-text')
      for (let i = 0; i < el.length; i++) {
        if (scrollTop >= el[i].offsetTop && scrollTop >= that.topHeight) {
          this.activeName = this.navList[i]
        }
      }
    },
    handleClick (tab, event) {
      this.activeName = tab.name
      let el = document.querySelectorAll('.nav-text')[tab.index]
      this.$nextTick(function () {
        window.scrollTo({
          'behavior': 'smooth',
          'top': el.offsetTop
        })
      })
    }
  }
}
</script>
<style lang="scss" scope>
  .Main {
    .isFixed {
      width: 1200px;
      height: 62px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      z-index: 999;
    }

    .el-tabs--border-card {
      border: none;
    }

    .el-tabs--border-card > .el-tabs__header {
      background-color: #53616d;
      border: none;
      margin: 0;
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: #ffffff;
      font-size: 18px;
      padding: 0 20px;
      height: 55px;
      line-height: 55px;
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
      color: #ffffff;
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #666666;
      border-radius: 5px 5px 0 0;
    }

    .el-tabs__nav-scroll {
      padding: 8px 10px 0 20px;
    }

    .el-tabs--border-card > .el-tabs__content {
      padding: 0;
    }

    .oneNav {
      height: 700px;
    }

    .nav-text {
      .icon {
        width: 40px;
        display: block;
        background: url('/static/all.png') no-repeat;
      }

      .icon1 {
        height: 43px;
        background-position: 0 -110px;
      }

      .icon2 {
        height: 40px;
        background-position: -40px -110px;
      }

      .icon3 {
        height: 44px;
        background-position: -80px -110px;
      }

      .icon4 {
        height: 61px;
        background-position: -120px -110px;
      }

      .icon5 {
        height: 34px;
        background-position: -166px -110px;
      }

      .icon6 {
        height: 40px;
        background-position: -209px -110px;
      }
      .text-align{
        text-align: left;
        padding: 0;
      }

      .table_list{
        margin-top: 5px;
        .dayDeast{
          margin-top: 40px;
          @extend .text-align;
          section, p{
            @extend .text-align;
          }
        }
        .day_title{
          display: flex;
          margin-bottom: 20px;
          font-size: 20px;
          line-height: 25px;
          background: #fff;
        }
        .day_list{
          position: relative;
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          &:after{
            content: '';
            width: 2px;
            height: 90%;
            position: absolute;
            top:10%;
            left: 10px;
            background: #F4F4F4;
          }
        }
      }

      .main-item {
        position: relative;
        margin-bottom: 20px;
        padding: 20px 20px 10px;
        background: #fff;
        border: 1px solid #e5e5e5;

        div {
          margin: 0 20px 0 90px;
        }

        .ItemIcon {
          position: absolute;
          left: 43px;
          top: 23px;
          margin: 0;

          i {
            font-size: 40px;
          }
        }

        .ItemTitle {
          padding: 0 0 15px;
          font-size: 18px;

          p {
            color: #999;
            font-size: 16px;
          }
        }

        .ItemInfo {
          padding: 0 0 5px;
          border-top: 1px solid #ddd;

          .itemBtn {
            display: inline-block;
            margin-top: 15px;
            padding: 0 15px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background: #7c8084;
            color: #fff;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
          }

          .detail {
            margin: 10px 0 0;
            padding-bottom: 10px;
            line-height: 25px;
            overflow: hidden;
            font-size: 14px;

            .detail-cell {
              position: relative;
              padding-left: 56px;
              line-height: 30px;

              label {
                color: #f60;
                position: absolute;
                left: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
