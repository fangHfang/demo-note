<template>
<div class="demandIndex">
  <div class="breadcrumb-title">我的余额</div>
  <ul class="table-List">
    <li>
      <label>我的余额:</label>
      <span>总余额{{data.YuE}}元</span>
    </li>
    <li>
      <label>余额充值:</label>
      <span><i @click="dialogVisible1 = true">(立即充值)</i></span>
      <span><i @click="toRecord('memberDemandAdd')">(查看我的充值记录)</i></span>
    </li>
    <li>
      <label>余额提现:</label>
      <span>可提现金额{{data.CanUse}}元 <i @click="dialogVisible2 = true">(申请提现)</i> <i @click="toRecord('memberDemandGet')">(查看我的提现记录)</i></span>
    </li>
    <li>
      <label>余额明细:</label>
      <span><i @click="toRecord('memberDemandMoney')">(查看我的余额明细记录)</i></span>
    </li>
  </ul>
  <el-dialog
    title="充值"
    :visible.sync="dialogVisible1"
    width="70%" @close="handleCancel">
    <div class="add-content">
      <div class="add-item"><em>充值金额</em><el-input style="width: 80px" placeholder="金额" type="number" v-model="submitAdd.Amount"></el-input></div>
      <div class="add-item">
        <em>充值方式</em>
        <el-radio v-model="submitAdd.PayMode" label="1">线下转账(注: 公司财务确认后变更用户余额)</el-radio>
        <el-radio v-model="submitAdd.PayMode" label="2">线上余额</el-radio>
      </div>
      <p class="dialog-title">选择收款账户</p>
      <el-table border :data="listData" style="width: 100%">
        <el-table-column align="center" prop="AccountType" label="类型" width="120"></el-table-column>
        <el-table-column align="center" prop="Desc" label="账户信息"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template v-slot="scope"><el-radio v-model="submitAdd.AccountId" :label="scope.row.Id">{{value}}</el-radio></template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
  </span>
  </el-dialog>
  <el-dialog title="提现" :visible.sync="dialogVisible2" width="70%" @close="handleCancel">
    <div class="add-content">
      <div class="add-item"><em>可用金额</em><span class="demandMoney">{{data.CanUse}}</span></div>
      <div class="add-item"><em>提现金额</em><el-input placeholder="金额" style="width: 80px" type="number" v-model="submitGet.Amount"></el-input></div>
      <div class="add-item">
        <em>提现方式</em>
        <el-select v-model="submitGet.AccountId" placeholder="选择收款账户">
          <el-option
            v-for="item in options"
            :key="item.Id"
            :label="item.AccountName + ',' + item.AccountCode + ',' + item.Bank"
            :value="item.Id">
          </el-option>
        </el-select>
        <span style="margin-left: 20px;color: #2a6496;cursor: pointer" @click="toBank">管理我的账户</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm2">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'index',
  data () {
    return {
      data: {
        CanUse: '',
        YuE: ''
      },
      dialogVisible1: false,
      dialogVisible2: false,
      submitAdd: {
        Amount: '',
        AccountId: '',
        PayMode: '1'
      },
      submitGet: {
        Amount: '',
        AccountId: ''
      },
      options: [],
      value: '',
      listData: []
    }
  },
  created () {
    this.getList()
    this.getBankData()
  },
  methods: {
    // 获取账户数据
    getBankData () {
      this.loading = true
      serverHttp.GetChongZhiAccount({}).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.listData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetTiXianAccount({}).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.options = res.data.List
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 对应记录页
    toRecord (pathName) {
      this.$router.push({
        name: pathName
      })
    },
    // 跳转账户页
    toBank () {
      this.$router.push({
        name: 'memberBankCard'
      })
    },
    // 获取余额
    getList () {
      serverHttp.GetUserMoney().then(res => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 取消充值
    handleCancel () {
      this.submitAdd = {
        Amount: '',
        AccountId: '',
        PayMode: '1'
      }
      this.submitGet = {
        Amount: '',
        AccountId: ''
      }
      this.dialogVisible1 = false
      this.dialogVisible2 = false
    },
    handleConfirm () {
      if (!this.submitAdd.Amount || Number(this.submitAdd.Amount) <= 0) {
        this.$message.warning('请填写正确的充值金额')
        return
      }
      if (!this.submitAdd.AccountId) {
        this.$message.warning('请选择账户')
        return
      }
      serverHttp.AddChongZhiLog(this.submitAdd).then(res => {
        if (res.code === 0) {
          this.$message.success('充值成功')
          this.handleCancel()
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleConfirm2 () {
      if (!this.submitGet.Amount || Number(this.submitGet.Amount) <= 0) {
        this.$message.warning('请填写正确的提现金额')
        return
      }
      if (!this.submitGet.AccountId) {
        this.$message.warning('请选择账户')
        return
      }
      serverHttp.AddTiXianLog(this.submitGet).then(res => {
        if (res.code === 0) {
          this.$message.success('提现成功')
          this.handleCancel()
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.demandIndex{
  .breadcrumb-title {
    padding-bottom: 13px;
    border-bottom: 2px solid #e5e5e5;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #666;
  }
  .table-List{
    li{
      line-height: 40px;
      label{
        width: 80px;
        text-align: right;
        font-size: 14px;
        color: #333;
        margin-right: 5px;
      }
      span{
        color: #666;
        font-size: 13px;
        i{
          color: #2a6496;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
  }

  .add-content{
    .add-item{
      overflow: hidden;
      line-height: 30px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      border-radius: 10px;
      em{
        width: 80px;
        padding: 10px;
        display: block;
        float: left;
        background: #e2e2e2;
        text-align: right;
      }
      .el-radio{
        margin: 17px 0 0 30px;
      }
      .demandMoney{
        padding: 10px;
        line-height: 30px;
        display: inline-block;
      }
    }
    .el-input{
      margin-top: 10px;
      padding: 0 10px;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
    }
    .el-select{
      height: 30px;
      .el-input__suffix{
        right: 10px;
      }
      .el-input__icon{
        line-height: 30px;
      }
    }
    .dialog-title{
      font-size: 16px;
      margin: 30px 0 20px;
      padding-left: 8px;
      border-left: 2px solid #f60;
    }
  }
  .el-dialog__footer{
    text-align: center;
  }
}
</style>
