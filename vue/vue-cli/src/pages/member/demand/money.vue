<template>
  <div class="demandMoney">
    <div class="header">
      <el-radio-group v-model="radio">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">充值</el-radio>
        <el-radio :label="2">提现</el-radio>
        <el-radio :label="3">使用</el-radio>
        <el-radio :label="4">退款</el-radio>
        <el-radio :label="5">提成</el-radio>
        <el-radio :label="6">返佣</el-radio>
      </el-radio-group>
      <el-date-picker
        class="date-picker"
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        value-format="yyyy-M-MM"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div style="margin-top: 10px;text-align: right;padding-right: 40px">
        <el-button type="warning" @click="search">搜索</el-button>
      </div>
    </div>
    <p class="title">充值记录</p>
    <ul class="lists" v-loading="loading">
      <li><section class="fn-left">详情</section><section class="fn-right tx-center" style="width: 100px;">金额</section></li>
      <li v-for="(item, index) in lists" :key="index" v-if="lists.length > 0">
        <section class="fn-left">
          <p>{{item.Remark}}</p>
          <p>{{item.AddTime}}</p>
        </section>
        <section class="fn-right tx-center" style="width: 100px;color: #06c;height: 100%;">
          <span class="delete add" v-if="item.Money > 0">+{{item.Money}}</span>
          <span class="delete jian" v-else>{{item.Money}}</span>
        </section>
      </li>
      <div class="noData" v-if="lists.length === 0">
        <img src="/static/noresult.png" alt="">
        <span>暂无相关信息</span>
      </div>
    </ul>
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
  watch: {
  },
  created () {
    this.getList()
  },
  methods: {
    changePage (e) {
      this.pager.page = e
      this.getList()
    },
    getList () {
      this.loading = true
      serverHttp.GetMoneyLogs({
        Page: this.pager.page,
        MoneyType: this.radio,
        StartDate: this.date ? this.date[0] : '',
        EndDate: this.date ? this.date[1] : ''
      }).then(res => {
        if (res.code === 0) {
          this.lists = res.data.List
          this.pager.total = res.data.Count
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    search () {
      this.pager.page = 1
      this.getList()
    }
  }
}
</script>

<style lang="scss">
  .demandMoney {
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
      li{
        font-size: 14px;
        line-height: 26px;
        padding: 10px 20px;
        border-bottom: 1px solid #e2e2e2;
        letter-spacing: .5px;
        color: #666;
        overflow: hidden;
        i{
          color: #3aa400;
          margin-left: 10px;
        }
        .delete{
          line-height: 52px;
          border-left: 1px solid #e2e2e2;
          /*padding-left: 20px;*/
          cursor: pointer;
          font-weight: 700;
          display: block;
        }
        .add{
          color: #090;
        }
        .jian{
          color: #f00;
        }
      }
      li:last-child{
        border-bottom: none;
      }
      li:first-child{
        background: #F2F2F2;
      }
    }
    .title {
      margin: 30px 0 10px;
      font-size: 16px;
      padding-left: 10px;
      border-left: 2px solid #3aa400;
    }
  }
</style>
