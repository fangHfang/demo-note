<template>
  <div style="background: #fff;height: 100vh;overflow-y: scroll">
    <div class="ht">
      <p class="title">
        <strong>附件4：转并团书面证明（合同编号{{allInfo.HeTongCode}}）</strong>
        <em class="red blod" v-if="allInfo.IsZuoFei" style="color:red;">(已作废)</em>
      </p>
      <p class="first-space">甲方：<span class="qm-line time">{{allInfo.KeHu_Name}}</span></p>
      <p class="first-space">乙方：<span class="qm-line time">{{allInfo.ZhangName}}</span></p>
      <p class="second-space">
        甲、乙双方签订编号为：<span class="qm-line time">{{allInfo.HeTongCode}}</span>的团队{{allInfo.HeTongTyPeName}}合同，前往<span
        class="qm-line time">{{allInfo.MuDiDi}}</span>旅游。
        因不能独立成团，现与<span class="qm-line time">{{allInfo.QiTaGongYingShang}}</span>旅行社并团成行出游。经乙方告知甲方同意转并团出游。旅游过程中出现服务质量问题，甲方应及时与乙方沟通协商解决；该转并团旅游并不免除合同约定的乙方应承担的责任。
      </p>
      <p class="second-space">本证明材料一式两份，双方各执一份，具有同等效力。</p>
      <p class="first-space"> 甲方（代表签字）：<img class="lvyouzhe" style="left: 60px;" :src="allInfo.KeHu_QianMing">{{allInfo.KeHu_QianYueDate}}
      </p>
      <p class="first-space">乙方经办人（签字）：<img style="left:120px;" class="lvxingshe"
                                            :src="allInfo.LvXingShe_GongZhang"><img class="lvyouzhe" style="left: 60px;"
                                                                                    :src="allInfo.LvXingShe_QianZi">{{allInfo.LvXingShe_QianYueDate}}
      </p>
      <p class="first-space"><span class="qm-line time">{{allInfo.LvXingShe_Name}}</span></p>
      <!-- <div :class="['qifeng', 'qifeng' + (index+1)]" v-for="(item, index) in allInfo.QiFengZhang">
                <img :src="item">
            </div> -->
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
        FjType: 4
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
    margin: 15px 0;
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
