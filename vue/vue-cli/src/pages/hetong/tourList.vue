<template>
  <div style="background: #fff;overflow-y: scroll;height: 100vh">
    <div class="ht">
      <!--行程单-->
      <p class="title">
        <strong>附件2：带团号的《旅游行程单》（合同编号{{allInfo.HeTongCode}}）</strong>
        <em class="red blod" v-if="allInfo.IsZuoFei" style="color:red;">(已作废)</em>
      </p>
      <p class="first-space">1、产品名称：<span class="qm-line time">{{allInfo.ResourceName}}</span></p>
      <p class="first-space">2、行程介绍：</p>
      <div v-if="allInfo.XingChengType == 0">
        <div v-for="(item, index) in allInfo.XingChengList" :key="index">
          <p class="second-space">
            第{{index+1}}天：
          <p style="margin-left: 15px;" v-for="(child, childIndex) in item.AnPai" :key="childIndex" v-if="child.Name">
            {{child.Hour}} : {{child.Minute}} {{child.Type}}: {{child.Name}} {{child.Remark}}
          </p>
        </div>
      </div>
      <div v-else>
        <div v-html="allInfo.XingCheng"></div>
      </div>
      <p class="first-space">3、费用包含：</p>
      <p class="second-space" v-for="(item, index) in allInfo.FeiYongBaoHan" :key="'type1' + index">
        {{item}}
      </p>
      <p class="first-space">4、费用不含：</p>
      <p class="second-space" v-for="(item, index) in allInfo.FeiYongBuHan" :key="'type2' + index">
        {{item}}
      </p>
      <p class="first-space">5、预订须知：</p>
      <p class="second-space" v-for="(item, index) in allInfo.YuDingXuZhi" :key="'type3' + index">
        {{item}}
      </p>
      <p class="first-space">6、温馨提示：</p>
      <p class="second-space" v-for="(item, index) in allInfo.WenXinTiShi" :key="'type4' + index">
        {{item}}
      </p>
      <p class="first-space">7、证件说明：</p>
      <p class="second-space" v-for="(item, index) in allInfo.ZhengJianShuoMing" :key="'type5' + index">
        {{item}}
      </p>
      <p class="first-space">8、旅游者：（代表人签字）<img class="lvyouzhe" style="left: 60px;" :src="allInfo.KeHu_QianMing">{{allInfo.KeHu_QianYueDate}}
      </p>
      <p class="first-space">9、签约代表签字（盖章）<img style="position: absolute;left:190px;" class="lvxingshe" :src="allInfo.LvXingShe_GongZhang">
        <img class="lvyouzhe" style="left: 60px;" :src="allInfo.LvXingShe_QianZi"/>{{allInfo.LvXingShe_QianYueDate}}
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
        },
        FeiYongBaoHan: [],
        FeiYongBuHan: [],
        YuDingXuZhi: [],
        WenXinTiShi: [],
        ZhengJianShuoMing: []
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
        FjType: 2
      }).then(res => {
        if (res.code === 0) {
          this.allInfo = res.data
          this.allInfo.FeiYongBaoHan = JSON.parse(JSON.stringify(res.data.FeiYongBaoHan))
          this.allInfo.YuDingXuZhi = JSON.parse(JSON.stringify(res.data.YuDingXuZhi))
          this.allInfo.FeiYongBuHan = JSON.parse(JSON.stringify(res.data.FeiYongBuHan))
          this.allInfo.WenXinTiShi = JSON.parse(JSON.stringify(res.data.WenXinTiShi))
          this.allInfo.ZhengJianShuoMing = JSON.parse(JSON.stringify(res.data.ZhengJianShuoMing))
        } else {
          this.$message.error('请求失败')
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
