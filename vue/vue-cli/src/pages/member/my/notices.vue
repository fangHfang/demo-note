<template>
<div class="myNotice">
  <div style="border-bottom: 1px solid #ddd;margin-bottom: 20px;">
    <el-radio-group v-model="tab">
      <el-radio-button label="1">收件箱</el-radio-button>
      <el-radio-button label="2">发件箱</el-radio-button>
    </el-radio-group>
    <el-button type="warning" size="small" class="fn-right" @click="addNotice">添加通知</el-button>
  </div>
  <div class="search-box">
    <el-form ref="form" label-width="80px">
      <el-form-item label="通知类别">
        <el-select v-model="submit.NoticeType" placeholder="请选择">
          <el-option
            v-for="item in noticeType"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id">
          </el-option>
        </el-select>
    </el-form-item>
      <el-form-item label="通知级别">
        <el-select v-model="submit.NoticeLevel" placeholder="请选择">
          <el-option
            v-for="item in noticeLevel"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input suffix-icon="el-icon-edit" v-model="submit.Keyword"></el-input>
      </el-form-item>
      <el-form-item label="通知状态">
        <el-select v-model="submit.Mode" placeholder="请选择" v-if="tab === '1'">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="已阅读" :value="1"></el-option>
          <el-option label="未阅读" :value="0"></el-option>
        </el-select>
        <el-select v-model="submit.Mode" placeholder="请选择" v-else>
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未作废" :value="1"></el-option>
          <el-option label="已作废" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="search">搜索</el-button>
        <el-button type="warning" plain @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="listData" v-if="listData.length > 0" style="width: 100%" border v-loading="loading">
    <el-table-column type="index" width="50" align="center"></el-table-column>
    <el-table-column label="通知级别" prop="NoticeLevelDesc" align="center" v-slot="scope">
      <p style="color: #090">{{scope.row.NoticeLevelDesc}}</p>
    </el-table-column>
    <el-table-column label="标题" prop="NoticelTitle" width="240" align="center" show-overflow-tooltip></el-table-column>
    <el-table-column label="通知类型" prop="NoticeTypeDesc" align="center"></el-table-column>
    <el-table-column label="通知人数" v-slot="scope" width="180" align="center" v-if="tab === '2'">
      共{{scope.row.UserCount}}人, 已读{{scope.row.ReadCount}}人
    </el-table-column>
    <el-table-column label="操作人员" v-slot="scope" width="180" align="center">
      {{scope.row.UserName}},{{scope.row.UserTelePhone}}
    </el-table-column>
    <el-table-column label="状态" prop="ReadStateDesc" align="center" v-if="tab === '1'"></el-table-column>
    <el-table-column label="状态" prop="EmailStateDesc" align="center" v-else></el-table-column>
    <el-table-column label="操作" width="100" align="center">
      <template v-slot="scope">
        <p class="operate" @click="updateBank(scope.row.Id, tab === '1' ? '收件' : '发件', scope.row.FromNoticeId)">查看</p>
        <p class="operate" v-if="scope.row.EmailState === 1 && tab === '2'" @click="deleteList(scope.row.Id)">作废</p>
      </template>
    </el-table-column>
  </el-table>
  <div v-else class="noData">
    <img src="/static/noresult.png" alt="">
    <span>暂无相关信息</span>
  </div>
  <pager :pager="pager" @changePage="changePage"></pager>
</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'notices',
  data () {
    return {
      tab: '1',
      submit: {
        Mode: -1,
        Keyword: '',
        NoticeLevel: '',
        NoticeType: ''
      },
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      listData: [],
      loading: false,
      noticeType: [],
      noticeLevel: []
    }
  },
  created () {
    this.getBaseData()
    this.getLists()
  },
  watch: {
    'tab' () {
      this.submit = {
        Mode: -1,
        Keyword: '',
        NoticeLevel: '',
        NoticeType: '',
        Page: this.pager.page
      }
      this.getLists()
    }
  },
  methods: {
    getLists () {
      this.loading = true
      this.submit.Page = this.pager.page
      if (this.tab === '1') {
        serverHttp.GetShouJianList(this.submit).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.listData = res.data.List
            this.pager.total = res.data.Count
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        serverHttp.GetFaJianList(this.submit).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.listData = res.data.List
            this.pager.total = res.data.Count
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    reset () {
      this.submit = {
        Mode: -1,
        Keyword: '',
        NoticeLevel: '',
        NoticeType: ''
      }
      this.getLists()
    },
    getBaseData () {
      serverHttp.GetNoticeType().then(res => {
        if (res.code === 0) {
          this.noticeType = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetNoticeLevel().then(res => {
        if (res.code === 0) {
          this.noticeLevel = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 分页
     * @param val
     */
    changePage (val) {
      this.pager.page = val
      this.getLists()
    },
    /**
     * 搜索
     */
    search () {
      this.pager.page = 1
      this.getLists()
    },
    /**
     * 作废
     * @param id
     */
    deleteList (id) {
      this.$confirm('您确定删除此银行卡吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.UpdateEmailState({
          FaJianId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功')
            this.getLists()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    addNotice () {
      this.$router.push({name: 'MemberMyNoticeAdd'})
    },
    updateBank (id, title, fromId) {
      window.open('#/member/myInfoView?id=' + id + '&title=' + title + '&fromId=' + fromId, '_blank')
    }
  }
}
</script>

<style lang="scss">
.myNotice{
  .search-box{
    .el-form-item{
      width: 25%;
      float: left;
      .el-icon-arrow-up:before{
        content: "\e78f";
      }
    }
    .el-form-item:last-child{
      .el-form-item__content{
        margin-left: 20px!important;
      }
    }
  }
  .el-radio-button__inner{
    border-bottom: none;
  }
  .operate{
    color: #06c;
    cursor: pointer;
  }
}
</style>
