<template>
  <div style="background: #fff;height: 100vh;overflow-y: scroll">
    <div class="ht">
      <!--旅游报名表-->
      <p class="title">
        <strong>附件1：旅游报名表（合同编号{{allInfo.HeTongCode}}）</strong>
        <em class="red blod" v-if="allInfo.IsZuoFei" style="color:red;">(已作废)</em>
      </p>
      <p class="first-space">1、旅游线路编号：<span class="qm-line time">{{allInfo.ResourceName}}</span></p>
      <p class="first-space">2、旅游者出团时间意向：<span class="qm-line time" v-if="allInfo.StartDate">{{allInfo.StartDate.slice(0, 10)}}</span>
      </p>
      <p class="first-space">3、旅游名单：</p>
      <!-- @for (int i = 0; i < Model.KeHu_RenYuan.Count(); i++) -->
      <!-- { -->
      <!-- var item = Model.KeHu_RenYuan[i]; -->
      <p class="second-space" v-for="(item, index) in allInfo.KeHu_RenYuan" :key="index">
        （{{index+1}}）、{{item.Name}}{{item.Telephone ? ',' + item.Telephone : ''}}，{{item.CodeType}}，{{item.CodeNum}},
        {{item.Address ? item.Address : ''}}</p>
      <!-- } -->
      <p class="first-space">4、身体状况：<span class="qm-line time">所有参团人员无突发病史、无药物过敏及几下身体状况，身体健康，适宜此次旅游。（需注明是否有身体残疾、精神疾病、高血压、心脏病等健康受损病症、病史、是否为妊娠期妇女。</span>
      </p>
      <p class="first-space">5、旅游者全部同行人名单及分房要求（所列同行人均视为旅游者要求必须同时安排出团）：<span class="qm-line time">无特殊要求</span></p>
      <p class="first-space">6、其他补充约定：<span class="qm-line time">以行程为准</span></p>
      <p class="first-space">7、旅游者确认签名（盖章）：<img class="lvyouzhe" style="left: 60px;" :src="allInfo.KeHu_QianMing">{{allInfo.KeHu_QianYueDate}}
      </p>
      <p class="first-space">8、备注：<span class="qm-line time">（年龄低于18周岁，需要提交家长书面同意出行书）</span></p>
      <p class="first-space">9、服务网点：<span class="qm-line time">{{allInfo.LvXingShe_Address}}</span></p>
      <p class="first-space">10、旅行社经办人：<img style="left:120px;" class="lvxingshe"
                                            :src="allInfo.LvXingShe_GongZhang"><img class="lvyouzhe" style="left: 60px;"
                                                                                    :src="allInfo.LvXingShe_QianZi">{{allInfo.LvXingShe_QianYueDate}}
      </p>

    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour.js'
export default {
  data () {
    return {
      allInfo: {
        upload: {
          Has: ''
        },
        htedit: {
          IsShowMy: ''
        }
      },
      OrderId: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId || ''
    this.getListData()
  },
  methods: {
    getListData () {
      serverHttp.getContractPerson({
        OrderId: this.OrderId,
        FjType: 1
      }).then(res => {
        if (res.code === 0) {
          this.allInfo = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .qifeng {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 150px;
    overflow: hidden;
  }

  body {
    font-family: "宋体", sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "宋体", sans-serif;
  }

  em {
    font-style: normal;
  }

  .first-space {
    text-indent: 0;
  }

  .first-space.badge {
    margin: 45px 0 10px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }

  .second-space {
    text-indent: 20px;
  }

  .three-space {
    text-indent: 30px;
  }

  .ht {
    position: relative;
    margin: 0 auto;
    width: 1000px;
    padding-bottom: 50px;
    text-align: left;
    font-size: 16px;
    line-height: 30px;
  }

  .ht .mtb15 {
    padding: 15px 0;
  }

  .ht .title {
    padding: 80px 0 20px;
    text-align: center;
    font-size: 22px;
  }

  .ht .title.first-title {
    font-size: 29px;
  }

  .ht .qm-line {
    padding: 0 70px;
    border-bottom: 1px solid #333;
  }

  .ht .qm-line.time {
    padding: 0 10px;
    color: #e04545;
    font-weight: bold;
  }

  .ht p, .tyqm {
    position: relative;
  }

  .tyqm img {
    position: absolute;
    top: -1px;
    left: -2px;
    height: 19px;
  }

  .lvyouzhe, .daibiaoqz {
    height: 60px;
    vertical-align: middle;
  }

  .lvxingshe {
    width: 130px;
  }

  .article-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 5px 10px;
    background: #fff;
    z-index: 9999;
  }

  .article-btn a {
    float: left;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #ff6815;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
  }

  @media screen and (max-width: 450px) {
    .ht {
      padding: 0 5px;
      width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    .ht .qm-line {
      padding: 0 40px;
    }

    .second-space {
      text-indent: 0;
    }
  }
</style>
