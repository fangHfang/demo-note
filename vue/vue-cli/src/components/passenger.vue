<template>
<!--  常旅客-->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" @close="handleCancel">
    <div>
        <div class="header">
          隶属部门:
          <el-select v-model="departId" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.number"
              :label="item.type"
              :value="item.number">
            </el-option>
          </el-select>
          <span style="margin-left: 15px">员工姓名/手机:</span>
          <el-input style="width: 220px" placeholder="员工姓名/手机号码" v-model="name"></el-input>
          <el-button style="margin-left: 15px" type="warning">立即搜索</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark">
          <el-table-column prop="type" label="姓名" align="center"></el-table-column>
          <el-table-column prop="type" label="所属部门" align="center"></el-table-column>
          <el-table-column prop="type" label="手机号码" align="center"></el-table-column>
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
      name: '',
      departId: '',
      pager: {
        page: 1,
        pageSize: 10,
        total: 20
      }
    }
  },
  watch: {
    personDialog (val) {
      this.departId = ''
      this.name = ''
      this.dialogVisible = val
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
    choose (item) {
      this.$emit('change', item)
    },
    /**
     * 分页
     */
    changePage (e) {
      this.pager.page = e
    }
  }
}
</script>

<style scoped>

</style>
