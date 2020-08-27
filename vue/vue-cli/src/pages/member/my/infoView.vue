<template>
<div class="infoViewDetail">
  <div class="content">
    <p class="small-title">{{$route.query.title}}信息查看</p>
    <table border class="table-baoXian">
      <tbody>
        <tr>
          <td>通知标题：</td>
          <td>{{data.NoticelTitle}}</td>
        </tr>
        <tr>
          <td>通知类型：</td>
          <td>{{data.NoticeTypeDesc}}</td>
        </tr>
        <tr>
          <td>通知级别：</td>
          <td>{{data.NoticeLevelDesc}}</td>
        </tr>
        <tr>
          <td>通知对象：</td>
          <td>
            <span v-if="typeof data.DuiXiang === 'string'">{{data.DuiXiang}}</span>
            <span v-else v-for="(item, index) in data.DuiXiang" :key="index">
              <i v-if="index < (data.DuiXiang.length - 1)">{{item.RealName}},</i>
              <i v-else>{{item.RealName}}</i>
            </span>
          </td>
        </tr>
        <tr v-if="$route.query.title === '发件'">
          <td>通知人数：</td>
          <td>共{{data.UserCount}}人, 已读{{data.ReadCount}}人</td>
        </tr>
        <tr>
          <td>通知内容：</td>
          <td><div v-html="data.NoticelContent"></div></td>
        </tr>
      </tbody>
    </table>
    <div class="tx-center" style="margin-top: 20px" v-if="!data.IsReplay && $route.query.title === '收件'">
      <el-button type="warning" @click="dialogVisible = true">回复阅读</el-button>
    </div>
    <p class="small-title">回复列表</p>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="回复人" width="200" v-slot="scope" v-if="$route.query.title === '发件'">
        <p>{{scope.row.UserName}},{{scope.row.UserTelePhone}}</p>
      </el-table-column>
      <el-table-column label="回复人" width="200" v-slot="scope" v-else>
        <p>{{scope.row.ReplayUserName}},{{scope.row.ReplayUserTelePhone}}</p>
      </el-table-column>
      <el-table-column label="回复内容" v-slot="scope">
        <p>{{scope.row.ReplyContent}}</p>
      </el-table-column>
    </el-table>
    <pager :pager="pager" @changePage="changePage"></pager>
  </div>
  <el-dialog title="通知阅读" :visible.sync="dialogVisible" width="1000px" @close="handleCancel">
    <table border class="table-baoXian">
      <tbody>
      <tr>
        <td>回复留言：</td>
        <td>
          <el-radio-group v-model="submitData.Flag">
          <el-radio :label="0">已阅读</el-radio>
          <el-radio :label="1">阅读并回复留言</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr v-if="submitData.Flag === 1">
        <td>回复内容：</td>
        <td>
          <el-input type="textarea" v-model="submitData.ReplyContent" placeholder="回复内容"></el-input>
        </td>
      </tr>
      </tbody>
    </table>
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
  name: 'baoXianDetail',
  data () {
    return {
      data: {
      },
      list: [],
      dialogVisible: false,
      radio: 1,
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      submitData: {
        ReplyContent: '',
        Flag: 0
      }
    }
  },
  created () {
    this.getPrice()
  },
  methods: {
    getPrice () {
      if (this.$route.query.title === '收件') {
        serverHttp.GetShouJianInfo({
          FaJianId: this.$route.query.fromId
        }).then(res => {
          if (res.code === 0) {
            this.data = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        serverHttp.GetShouJianReplayList({
          FaJianId: this.$route.query.fromId,
          page: this.pager.page
        }).then(res => {
          if (res.code === 0) {
            this.list = res.data.List
            this.pager.page = res.data.Index
            this.pager.total = res.data.Count
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        serverHttp.GetFaJianInfo({
          FaJianId: this.$route.query.id
        }).then(res => {
          if (res.code === 0) {
            this.data = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        serverHttp.GetFaJianReplayList({
          FaJianId: this.$route.query.id,
          page: this.pager.page
        }).then(res => {
          if (res.code === 0) {
            this.list = res.data.List
            this.pager.page = res.data.Index
            this.pager.total = res.data.Count
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    changePage (val) {
      this.pager.page = val
      this.getPrice()
    },
    handleCancel () {
      this.submitData = {
        ReplayContent: '',
        Flag: 0
      }
      this.dialogVisible = false
    },
    handleConfirm () {
      serverHttp.Replay({
        ShouJianId: this.$route.query.id,
        ...this.submitData
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('回复成功')
          this.handleCancel()
          this.getPrice()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.infoViewDetail{
  background: #fff;
  .blue{
    color: #06c;
    cursor: pointer;
    line-height: 60px;
  }
  .title{
    padding: 10px 0;
    line-height: 40px;
    text-align: center;
    background-color: #373d41;
    color: #fff;
    font-size: 24px;
  }
  .content{
    padding: 20px;
    .small-title{
      font-size: 20px;
      padding-left: 8px;
      margin: 30px 0;
      border-left: 2px solid #f60;
    }
  }
  .table-baoXian{
    width: 100%;
    border: 1px solid #e2e2e2;
    tbody{
      tr{
        td{
          padding: 5px 6px;
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          word-break: break-all;
          font-size: 14px;
          p{
            line-height: 40px!important;
          }
        }
        td:first-child{
          width: 120px;
          background: #f5f5f5;
          color: #000;
          text-align: right;
        }
        td:last-child{
          color: #666;
        }
      }
    }
  }
}
</style>
