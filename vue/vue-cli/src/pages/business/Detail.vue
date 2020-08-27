<template>
  <div class="business">
    <div class="detail">
      <section class="infomation">
        <el-row :gutter="20">
          <el-col :span="3"><img class="logo" src="/static/default.gif" alt=""></el-col>
          <el-col :span="21">
            <div class="title">
              <p>邮轮公司 <i>[邮轮公司]</i></p>
              <p class="font-14">经营许可证号: 123456</p>
              <p class="font-14">所在地址: 国内 山西省 太原市 小店区 平阳路</p>
            </div>
          </el-col>
        </el-row>
        <el-row class="main-info">
          <p><label>经营范围:</label>邮轮</p>
          <p><label>办公电话:</label>7293052</p>
          <p><label>企业法人:</label>王某</p>
          <p><label>企业介绍:</label>邮轮公司</p>
          <p><label>传真号码:</label>7293052</p>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  methods: {
  }
}
</script>

<style lang="scss">
  .business {
    .detail {
      width: 1200px;
      margin: 20px auto;
      background: #fff;
      .infomation{
        padding: 20px;
        .logo{
          width: 135px;
          height: 90px;
        }
        .title{
          p{
            color: #666666;
            margin-top: 6px;
          }
          p:first-child{
            font-size: 26px;
            margin-top: 0;
            i{
              color: #999;
              font-size: 18px;
            }
          }
        }
        .main-info{
          background: #f6f6f6;
          padding: 10px 20px;
          margin-top: 15px;
          font-size: 12px;
          p{
            line-height: 38px;
            color: #999;
            label{
              color: #666;
              letter-spacing: 1px;
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
</style>
