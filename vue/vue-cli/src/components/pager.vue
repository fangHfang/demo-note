<template>
  <div class="pager-style">
    <el-pagination
      v-if="Number(pager.total) > 10"
      @current-change="handleCurrentChange"
      :page-size="Number(pager.pageSize)"
      background
      :current-page="Number(pager.page)"
      :layout="layout || 'total, prev, pager, next, jumper'"
      :total="Number(pager.total)">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pager',
  props: {
    pager: {
      type: Object
    },
    layout: {
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('changePage', val)
    }
  }
}
</script>

<style lang="scss">
.pager-style{
  width: 100%;
  text-align: right;
  margin: 20px 0;
}
</style>
