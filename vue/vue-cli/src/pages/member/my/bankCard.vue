<template>
<div class="myInfo">
  <div class="breadcrumb-title">银行账户 <i @click="dialogVisible = true,title = '添加银行账户'">新增银行卡</i></div>
  <el-table :data="listData" row-class-name="orderTable" v-if="listData.length>0" v-loading="loading">
    <el-table-column prop="AccountTypeName" label="账户类型"></el-table-column>
    <el-table-column prop="AccountName" align="center" label="开户名" width="150"></el-table-column>
    <el-table-column prop="Bank" align="center" label="开户行" width="150"></el-table-column>
    <el-table-column prop="AccountCode" align="center" label="账号"></el-table-column>
    <el-table-column label="操作" align="center" width="130" v-slot="scope">
      <span class="itemRow toLink" @click="updateBank(scope.row.Id)">修改</span>
      <span class="itemRow toLink" @click="deleteList(scope.row.Id)">删除</span>
    </el-table-column>
  </el-table>
  <div v-else class="noData">
    <img src="/static/noresult.png" alt="">
    <span>暂无相关信息</span>
  </div>
  <pager :pager="pager" @changePage="changePage"></pager>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" @close="handleCancel">
    <div class="add-content">
      <div class="add-item">
        <em>选择账户类型</em>
        <span style="display: inline-block;padding: 10px">个人账户</span>
      </div>
      <div class="add-item"><em>开户名</em><el-input placeholder="开户名" style="width: 220px" type="text" v-model="submit.AccountName"></el-input></div>
      <div class="add-item"><em>账号</em><el-input placeholder="账号" style="width: 220px" type="text" v-model="submit.AccountCode"></el-input></div>
      <div class="add-item"><em>开户行</em><el-input placeholder="开户行" style="width: 220px" type="text" v-model="submit.Bank"></el-input></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'bankCard',
  data () {
    return {
      dialogVisible: false,
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      title: '',
      submit: {
        AccountId: '',
        AccountCode: '',
        AccountName: '',
        Bank: '',
        // 0 停用 1 启用
        Flag: 1,
        Remark: ''
      },
      listData: [],
      loading: false
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    // 获取列表数据
    getLists () {
      this.loading = true
      serverHttp.GetUserAccountList({
        page: this.pager.page
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.listData = res.data.List
          this.pager.page = res.data.Index
          this.pager.total = res.data.Index
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteList (id) {
      this.$confirm('您确定删除此银行卡吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.DeleteAccount({
          AccountId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getLists()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    changePage (val) {
      this.pager.page = val
      this.getLists()
    },
    updateBank (id) {
      this.dialogVisible = true
      this.title = '修改银行账户'
      serverHttp.GetAccountInfo({
        AccountId: id
      }).then(res => {
        if (res.code === 0) {
          this.submit = res.data
          this.submit.AccountId = id
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel () {
      this.submit = {
        AccountId: '',
        AccountCode: '',
        AccountName: '',
        Bank: '',
        Flag: 1,
        Remark: ''
      }
      this.dialogVisible = false
    },
    handleConfirm () {
      if (!this.submit.AccountCode || !this.submit.AccountName || !this.submit.Bank) {
        this.$message.warning('请完善账户信息')
        return
      }
      serverHttp.EditAccount(this.submit).then(res => {
        if (res.code === 0) {
          this.$message.success('账户信息保存成功!')
          this.handleCancel()
          this.getLists()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
  .myInfo {
    .breadcrumb-title {
      padding-bottom: 13px;
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
      color: #666;
      i{
        display: block;
        float: right;
        font-size: 14px;
        color: #fff;
        background: #f60;
        width: 120px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 4px;
        cursor: pointer;
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
          width: 100px;
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
        border-left: 2px solid #ddd;
      }
    }
  }
</style>
