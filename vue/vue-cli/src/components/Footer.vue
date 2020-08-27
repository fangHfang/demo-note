<template>
    <div class="footer">
      <section>
        <ul class="lanmu">
          <li>
            <dl class="rexian">
              <dt></dt>
              <dd>
                <span>24小时服务热线:</span>
                <span>95711</span>
              </dd>
            </dl>
            <dl class="rexian">
              <dt></dt>
              <dd>
                <span>意见反馈</span>
              </dd>
            </dl>
          </li>
          <li>
            <ul>
              <li>
                <h4>关于同程</h4>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h4>加盟合作</h4>
              </li>
              <li>
                <a href="javascript:;">合作加盟</a>
              </li>
              <li>
                <a href="javascript:;">商旅合作</a>
              </li>
              <li>
                <a href="javascript:;">旅游保险</a>
              </li>
              <li>
                <a href="javascript:;">网站联盟</a>
              </li>
              <li>
                <a href="javascript:;">门票合作</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h4>关于同程</h4>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
              <li>
                <a href="javascript:;">同城简介</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <h4>同程旅游app</h4>
              </li>
              <img src="https://pic5.40017.cn/01/001/7b/60/rBANC1pW0F6AAgykAAAcbQw-0TI473.png" alt="">
            </ul>
          </li>
        </ul>
        <p class="lianjie first"><strong>热点推荐:</strong> <em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em><em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em><em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em></p>
        <p class="lianjie"><strong>友情链接:</strong> <em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em><em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em><em>迪拜旅游</em><em>迪拜旅游</em><em>泰国旅游</em><em>巴厘岛旅游</em></p>
      </section>
      <div class="footer-bottom">
        <section>
          <p>热线：{{data.Hotline1 || data.Hotline1 || data.Hotline1}} &nbsp;&nbsp;&nbsp;&nbsp;ICP备案号：{{data.ICPNumber}}</p>
          <p><em>供应商系统</em> &nbsp;&nbsp;&nbsp;&nbsp;<em>技术支持：中奥科技股份有限公司</em></p>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    data: {
      type: Object,
      defaults: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  width: 100%;
    background: #484848;
  section{
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    color: #ccc;
    .lanmu{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #565656;
      .rexian{
        width: 160px;
        margin-bottom: 20px;
        font-size: 14px;
        dt{
          width: 46px;
          height: 46px;
          float: left;
          margin-right: 10px;
          background: url('/static/rexian.png') no-repeat 0 0;
          background-position: 0 -152px;
        }
        span{
          line-height: 22px;
          color: #fff;
        }
        &:last-child span{
          line-height: 46px;
        }
      }
      li{
        ul{
          li{
            margin-bottom: 8px;
            h4{
              color: #fff;
              font-size: 14px;
            }
            a{
              outline: none;
              color: #ccc;
              font-size: 12px;
            }
          }
        }
      }
    }
    .lianjie{
      margin: 8px 0;
      em, strong{
        margin-right: 8px;
        color: #888;
      }
      em{
        cursor: pointer;
        &:hover{
          color: #f60
        }
      }
    }
  }
  .footer-bottom{
    background-color: #3c3c3c;
    text-align: center;
    line-height: 26px
  }
}
</style>
