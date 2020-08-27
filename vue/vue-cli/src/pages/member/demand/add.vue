<template>
  <div class="demandAdd">
    <div class="header">
      <el-radio-group v-model="radio">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">已确认</el-radio>
        <el-radio :label="2">未确认</el-radio>
        <el-radio :label="3">已拒绝</el-radio>
      </el-radio-group>
      <el-date-picker
        class="date-picker"
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-M-MM"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="warning" @click="search">搜索</el-button>
    </div>
    <p class="title">充值记录</p>
    <ul class="lists" v-loading="loading" v-if="lists.length">
      <li v-for="(item, index) in lists" :key="index">
        {{item.Amount}}, <i :style="{'color': item.FinanceStatus === 1 ? '#3aa400' : item.FinanceStatus === 2 ? '#f60' : 'red'}">{{item.FinanceStatus === 1 ? '已确认' : item.FinanceStatus === 2 ? '未确认' : '已拒绝'}}</i>, <span style="margin-left: 10px">{{item.AddTime}}</span>

        <span class="fn-right delete" @click="deleteList(item.Id)">删除</span>
      </li>
    </ul>
    <div class="noData" v-else>
      <img src="/static/noresult.png" alt="">
      <span>暂无相关信息</span>
    </div>
    <pager :pager="pager" @changePage="changePage"></pager>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'add',
  data () {
    return {
      radio: 0,
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      lists: [],
      pager: {
        pageSize: 10,
        total: 0,
        page: 1
      },
      loading: false
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    changePage (e) {
      this.pager.page = e
      this.getLists()
    },
    getLists () {
      this.loading = true
      serverHttp.GetChongZhiLogs({
        FinanceStatus: this.radio,
        StartDate: this.date ? this.date[0] : '',
        EndDate: this.date ? this.date[1] : '',
        page: this.pager.page
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.lists = res.data.List
          this.pager.total = res.data.Count
          this.pager.page = res.data.Index
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deleteList (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.DeleteChongZhiLog({
          LogId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      })
    },
    search () {
      this.pager.page = 1
      this.getLists()
    }
  }
}
</script>

<style lang="scss">
  .demandAdd {
    .header{
      padding: 10px 15px;
      background: rgb(242, 242, 242);
      border-radius: 10px;
      box-sizing: border-box;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
      .el-date-editor .el-range-separator, .el-date-editor .el-range__icon,.el-date-editor .el-range__close-icon{
        line-height: 20px;
      }
      .el-range-editor.is-active, .el-range-editor.is-active:hover{
        border-color: #3aa400;
      }
      .date-picker{
        margin-left: 30px;
      }
      .el-button{
        padding: 6px 20px;
        margin-left: 20px;
      }
    }
    .lists{
      margin: 0 0 20px;
      border: 1px solid #e2e2e2;
      color: #666;
      li{
        line-height: 20px;
        font-size: 14px;
        padding: 10px 20px;
        border-bottom: 1px solid #e2e2e2;
        i{
          color: #3aa400;
          margin-left: 10px;
        }
        .delete{
           border-left: 1px solid #e2e2e2;
           padding-left: 20px;
           color: #06c;
          cursor: pointer;
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
    .title{
      margin: 30px 0 10px;
      font-size: 16px;
      padding-left: 10px;
      border-left: 2px solid #3aa400;
    }
  }
</style>
