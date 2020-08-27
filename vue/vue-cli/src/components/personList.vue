<template>
<!--  常旅客-->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px" @close="handleCancel">
    <div>
        <div class="header">
          旅客姓名/手机:
          <el-input style="width: 220px" placeholder="旅客姓名/手机号码" v-model="name"></el-input>
          <el-button type="warning" @click="search">立即搜索</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark" v-loading="loading">
          <el-table-column prop="Name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="Sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="Telephone" label="电话" align="center"></el-table-column>
          <el-table-column prop="ShenFenZheng" label="身份证号" align="center"></el-table-column>
          <el-table-column prop="HuZhao" label="护照" align="center"></el-table-column>
          <el-table-column prop="QiTaZhengJian" label="其他证件" align="center"></el-table-column>
          <el-table-column prop="Birthday" label="生日" align="center"></el-table-column>
          <el-table-column label="操作" width="55" v-slot="scope">
            <el-checkbox v-model="scope.row.choose" @change="changeChoose(scope.row)"></el-checkbox>
          </el-table-column>
        </el-table>
        <pager :pager="pager" @changePage="changePage"></pager>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="handleConfirm">确 定</el-button>
      <el-button type="success" plain @click="handleCancel">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
import sererHttp from '@/assets/common/tour'
export default {
  name: 'personList',
  props: {
    personDialog: {
      type: Boolean,
      defaults: false
    },
    title: {
      defaults: '提示'
    }
  },
  data () {
    return {
      dialogVisible: false,
      list: [
        {type: '儿童(2周岁以下)', price: '500', number: 1}, {type: '成人(普通)', price: '2000', number: 1}
      ],
      name: '',
      pager: {
        page: 1,
        pageSize: 10,
        total: 20
      },
      loading: false
    }
  },
  watch: {
    personDialog (val) {
      this.dialogVisible = val
      this.name = ''
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    // 取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 确认
    handleConfirm () {
      this.$emit('confirm')
    },
    getList () {
      this.loading = true
      sererHttp.GetChnagLvKeList({
        OrderId: this.$route.query.OrderId,
        Keyword: this.name,
        page: this.pager.page
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.list = res.data.List
          this.pager.total = res.data.Count
          this.pager.page = res.data.Index
          if (this.list.length > 0) {
            this.list.forEach(v => {
              if (v.IsChecked === 1) {
                this.$set(v, 'choose', true)
              } else {
                this.$set(v, 'choose', false)
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 分页
     */
    changePage (e) {
      this.pager.page = e
      this.getList()
    },
    search () {
      this.pager.page = 1
      this.getList()
    },
    changeChoose (row) {
      sererHttp.ChooseChnagLvKe({
        OrderId: this.$route.query.OrderId,
        ChangLvKeUserId: row.Id,
        Choosed: row.choose === false ? 0 : 1
      }).then(res => {
        if (res.code === 0) {
        } else {
          this.$message.error(res.msg)
        }
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
