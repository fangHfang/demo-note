<template>
  <div style="height: 100vh;background: #fff;overflow-y: scroll">
    <div class="ht">
      <p class="title">
        <strong>附件3：授权委托书（合同编号{{allInfo.HeTongCode}}）</strong>
        <em class="red blod" v-if="allInfo.IsZuoFei" style="color:red;">(已作废)</em>
      </p>
      <p class="first-space">{{allInfo.ZhangName}}</p>
      <p class="second-space">我们共同委托{{allInfo.KeHu_Name}}作为代表人，与贵社签订团号为：{{allInfo.HeTongCode}}的旅游合同，前往
        {{allInfo.MuDiDi}}旅游。</p>
      <p class="second-space">全体委托人和代表人共( {{allInfo.KeHu_Num}}人)共同作为本境外游旅游合同的甲方，履行本合同约定的权利义务，承担本合同约定的责任。</p>
      <p class="first-space">受委托人（代表人）（签字）：<img class="lvyouzhe" style="left: 60px;" :src="allInfo.KeHu_QianMing">{{allInfo.KeHu_QianYueDate}}
      </p>
      <div class="first-space">
        全体委托人（签字）：
        <div v-for="(item, index) in allInfo.YouKe_QianMing" :key="index" >
          <img class="lvyouzhe" style="left: 60px;" :src="item.Key"/>
          {{item.Value}}
        </div>
      </div>
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
        FjType: 3
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
    background: #fff;
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
