<template>
  <div class="guide-detail">
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="17">
          <div class="content-left">
            <p class="title">{{info.Title}}</p>
            <div class="time">
              <span><i>出发地区: {{info.title}}</i><i>目的地: {{info.title}}</i><i>出发时间: {{info.LastTime}}</i><i>旅游天数: {{info.num}}</i><i>出游人数: {{info.num}}</i></span>
            </div>
            <div class="info" v-html="info.NeiRong"></div>
          </div>
        </el-col>
        <el-col :span="7">
<!--          <div class="notice">-->
<!--            <p class="title">栏目</p>-->
<!--            <ul class="typeList">-->
<!--              <li @click="handleList('1')">-->
<!--                二级-->
<!--              </li>-->
<!--              <li @click="handleList('1')">-->
<!--                二级-->
<!--              </li>-->
<!--              <li @click="handleList('1')">-->
<!--                二级-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
          <div class="notice">
            <p class="title">热门</p>
            <ul class="hotList">
              <li v-for="(item, index) in reMenlistData" :key="index" class="text-over-hidden" @click="toDetail(item)">
                <i :class="{'top3': index < 3}">{{index+1}}</i>
                {{item.Title}}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/gonglue'
export default {
  name: 'Detail',
  data () {
    return {
      input: '',
      info: {},
      reMenlistData: [],
      siteLanMuId: '',
      gongLueId: ''
    }
  },
  mounted () {
    this.gongLueId = this.$route.query.id
    this.siteLanMuId = this.$route.query.siteLanMuId
    this.getReMenList()
    this.getDetail()
  },
  methods: {
    getReMenList () {
      let SiteLanMuId = this.siteLanMuId
      serverHttp.GetListForReMen({SiteLanMuId}).then(res => {
        this.reMenlistData = res.data
      })
    },
    getDetail () {
      let Id = this.gongLueId
      serverHttp.GetDetail({Id}).then(res => {
        console.log(res)
        this.info = res.data
      })
    },
    /**
     * 根据类型筛选数据列表
     * @param item
     */
    handleList (item) {
      this.$router.push({name: 'guideIndex'})
    },
    /**
     * 跳转热门文章详情
     * @param item
     */
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'guideDetail', query: {id: item.Id, siteLanMuId: this.siteLanMuId}})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="scss">

  $red: #ec5353;
  .guide-detail {
    .content {
      padding: 20px 0 0;
      overflow: hidden;

      .content-left {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;

        .title {
          text-align: center;
          font-size: 24px;
          color: #333333;
          line-height: 30px;
        }

        .time {
          color: #888;
          font-size: 13px;
          margin-top: 20px;
          line-height: 25px;
          text-align: center;
          letter-spacing: .5px;
          i{
            margin: 0 10px;
          }
        }

        .info {
          margin-top: 20px;
          font-size: 14px;
          line-height: 26px;
        }
      }

      .notice {
        background: #fafafa;
        padding-top: 20px;
        margin-bottom: 20px;

        .title {
          margin-bottom: 5px;
          font-size: 20px;
          border-left: 4px solid $red;
          padding-left: 10px;
        }

        .typeList {
          padding: 9px 12px 11px;
          overflow: hidden;

          li {
            width: 50%;
            height: 33px;
            margin-bottom: 5px;
            text-align: center;
            line-height: 33px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
            float: left;
            box-sizing: border-box;

            &:hover {
              color: $red;
            }
          }

          li:nth-child(2n+1) {
            border-right: 1px solid #ccc;
          }

          .activeType {
            color: $red;
          }
        }

        .hotList {
          padding: 9px 12px 11px;

          li {
            height: 18px;
            line-height: 18px;
            margin: 7px 0 9px;
            font-size: 14px;

            i {
              background: #cbcbcb;
              border-color: #cbcbcb;
              color: #fff;
              display: inline-block;
              width: 15px;
              height: 15px;
              text-align: center;
              line-height: 15px;
              font-size: 12px;
              margin-right: 6px;
            }

            &:hover {
              color: $red;
              cursor: pointer;
            }
          }

          .top3 {
            background: $red;
            border-color: $red;
          }
        }
      }
    }
  }
</style>
