<template>
    <div class="printing">
        <div class="breadcrumb-title">游客名单</div>
        <div class="topBox">
            <p class="info">订单编号：{{OrderCode}}，游客联系人：{{name}} {{telephone}}</p>
        </div>
        <el-table border :data="listData" id="printTest" style="width: 100%">
          <el-table-column align="center" prop="num" label="序" width="120"></el-table-column>
          <el-table-column align="center" prop="XingMing" label="游客信息">
          </el-table-column>
        </el-table>
        <div class="btn">
          <el-button type="primary" v-print="'#printTest'" class="printingBtn">立即打印</el-button>
        </div>
    </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
export default {
  data () {
    return {
      listData: [],
      OrderId: '',
      OrderCode: '',
      name: '',
      telephone: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
    this.OrderCode = this.$route.query.OrderCode
    this.getMingDans()
  },
  methods: {
    getMingDans () {
      serverHttp.GetMingDans({OrderId: this.OrderId}).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.name = res.data[0].XingMing
            this.telephone = res.data[0].Telephone
            let listData = res.data
            listData.forEach((item, index) => {
              item.num = index + 1
            })
            this.listData = listData
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.printing{
  .breadcrumb-title{
    padding-bottom: 13px;
    border-bottom: 2px solid #e5e5e5;
    font-size: 18px;
    font-weight: 500;
    color: #666;
  }
  .topBox{
    margin-top: 10px;
    .info{
      margin-bottom: 15px;
      font-size: 16px;
      padding-left: 8px;
      border-left: 3px solid #20a832;
    }
  }
  .btn{
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .printingBtn{
      display: block;
    }
  }
}
</style>
