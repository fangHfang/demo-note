<template>
  <div class="news-detail">
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="17">
          <div class="content-left">
            <p class="title">{{detailData.Title}}</p>
            <div class="time">
              <span>更新日期: {{detailData.LastTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源: {{detailData.ZuoZhe}}</span>
              <div class="bdsharebuttonbox">
                <a href="#" class="popup_sqq" data-cmd="sqq"></a>
                <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                <a href="#" class="bds_renren" data-cmd="renren"></a>
                <a href="#" class="popup_tqf" data-cmd="tqf"></a>
              </div>
            </div>
            <img :src="detailData.PicUrl" alt="" v-if="detailData.HasPic === 0">
            <div class="info" v-html="detailData.NeiRong"></div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="notice">
            <p class="title">热门</p>
            <ul class="hotList">
              <li v-for="(item, index) in reMenList" :key="index" class="text-over-hidden" @click="toDetail(item)">
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
import serverHttp from '@/assets/common/zixun'
export default {
  name: 'Detail',
  data () {
    return {
      input: '',
      detailData: {},
      listData: [],
      reMenList: []
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.setShare()
    }, 0)
    this.getReMenList()
    this.getDetail()
  },
  methods: {
    /**
     * 根据类型筛选数据列表
     * @param item
     */
    handleList (item) {
      this.$router.push({name: 'newsIndex'})
    },
    /**
     * 跳转热门文章详情
     * @param item
     */
    toDetail (item) {
      let routeData = this.$router.resolve({name: 'zhengwuDetail', query: {id: item.Id, siteLanMuId: this.$route.query.siteLanMuId}})
      window.open(routeData.href, '_blank')
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
    // 获取热门列表
    getReMenList () {
      serverHttp.GetListForReMen({siteLanMuId: this.$route.query.siteLanMuId}).then(res => {
        this.reMenList = res.data
      })
    },
    // 获取详情
    getDetail () {
      serverHttp.GetDetail({Id: this.$route.query.id}).then(res => {
        this.detailData = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .news {
    background: #f6f6f6;
  }

  $red: #ec5353;
  .news-detail {
    .content {
      margin: 20px 0 0;
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
          font-size: 14px;
          margin-top: 20px;
          line-height: 25px;
          .bdsharebuttonbox{
            float: right;
            .popup_sqq{
              background-position: 0 -2652px;
            }
            .popup_tqf{
              background-position: 0 -364px;
            }
          }
        }

        .info {
          margin-top: 20px;
          font-size: 14px;
          line-height: 26px;
        }
      }

      .notice {
        background: #fff;
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
