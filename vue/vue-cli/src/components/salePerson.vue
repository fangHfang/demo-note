<template>
<!--  常旅客-->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px" @close="handleCancel">
    <div>
        <div class="header">
          隶属部门:
          <el-select v-model="DepartmentId" placeholder="请选择" clearable>
            <el-option
              v-for="item in departData"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
          <span style="margin-left: 15px">员工姓名/手机:</span>
          <el-input style="width: 220px" placeholder="员工姓名/手机号码" v-model="Keyword"></el-input>
          <el-button style="margin-left: 15px" type="warning" @click="search">立即搜索</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark">
          <el-table-column prop="Name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="BuMen" label="所属部门" align="center"></el-table-column>
          <el-table-column prop="Telephone" label="手机号码" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="170" v-slot="scope">
            <p style="cursor: pointer;color: #06C" @click="choose(scope.row)">选择</p>
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
import serverHttp from '@/assets/common/tour'
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
        {type: '儿童(2周岁以下)', price: '500', number: 1}, {type: '成人(普通)', price: '2000', number: 2}
      ],
      DepartmentId: '',
      Keyword: '',
      pager: {
        page: 1,
        pageSize: 10,
        total: 20
      },
      departData: []
    }
  },
  watch: {
    personDialog (val) {
      this.DepartmentId = ''
      this.Keyword = ''
      this.dialogVisible = val
      if (val) {
        this.getLists()
        this.getBaseData()
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
    getLists () {
      serverHttp.GetKeHuByYuanGong({
        Keyword: this.Keyword,
        DepartmentId: this.DepartmentId,
        Index: this.pager.page
      }).then(res => {
        if (res.code === 0) {
          this.list = res.data.List
          this.pager.total = res.data.Count
          this.pager.page = res.data.Index
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getBaseData () {
      serverHttp.GetBuMen({
      }).then(res => {
        if (res.code === 0) {
          this.departData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    choose (item) {
      this.$emit('change', item)
    },
    /**
     * 分页
     */
    changePage (e) {
      this.pager.page = e
      this.getLists()
    },
    // 搜索
    search () {
      this.pager.page = 1
      this.getLists()
    }
  }
}
</script>

<style scoped>

</style>
