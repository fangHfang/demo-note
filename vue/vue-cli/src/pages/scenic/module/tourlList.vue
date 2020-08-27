<template>
  <div class="views-list">
    <div class="left-content">
      <el-row>
        <el-col class="card" :span="24" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <router-link to='tourinfo' class="imagebox" target=_blank>
              <img src="/static/default.gif" class="image">
            </router-link>
            <div class="ProductInfo">
              <h3>
                <router-link class="title text-over-hidden" to='' :title="text" target=_blank>{{text}}</router-link>
              </h3>
              <dl class="clearfix fatuanDate">
                <dt>景区地址</dt>
                <dd class="tuanqi">山西省太原市小店区 <i>查看地图</i></dd>
              </dl>
              <dl class="clearfix fatuanDate">
                <dt>营业时间</dt>
                <dd class="tuanqi">2019-02-01</dd>
                <dd></dd>
              </dl>
              <dl class="clearfix fatuanDate">
                <dt>景区特色</dt>
                <dd class="tuanqi">特色哈哈哈</dd>
                <dd></dd>
              </dl>
            </div>
            <div class="ProductWrap">
              <div class="ProductPrice">
                <span>请咨询</span>
              </div>
              <el-link class="ProductBtn" :underline="false" href="" target="_blank">查看详情</el-link>
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
          <li>
            <router-link to=''>
              <img src="/static/default.gif" alt="">
              <div>
                <p class="text-over-hidden">太原五洲大酒店</p>
                <p class="text-over-hidden">山西省太原市迎泽区五一广场蝴蝶卡省</p>
                <p class="text-over-hidden"><i>￥<strong>0</strong></i> 起</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import pager from '@/components/pager'

export default {
  components: {pager},
  data () {
    return {
      tag: '太原出发',
      text: '【国内游】太原+大同-1天1夜-测试分销商线路001+LY17-001',
      zhuti: ['邮轮旅游', '常规旅游', '毕业游'],
      pager: {
        pageSize: 10,
        page: 1,
        total: 200
      }
    }
  },
  methods: {
    changePage (val) {
      this.pager.page = val
    }
  }
}
</script>
<style lang="scss" scoped>
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

        > > > .ProductBtn {
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

        > > > .ProductBtn:hover {
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
        padding: 0 20px;

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

          li > a {
            float: left;
            margin-top: 13px;
            padding: 0 5px;
            overflow: hidden;
            color: #333333;

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
        }
      }
    }
  }
</style>
