<template>
  <div class="order-content">
    <div class="wrapper">
      <!--<step :current="current" :list="list"></step>-->
      <router-view/>
    </div>
  </div>
</template>

<script>
import step from '@/components/step'
export default {
  name: 'YuDing',
  components: {step},
  data () {
    return {
      list: ['第一步: 基本信息', '第二步: 付款'],
      // tab进度条
      current: 0,
      // -------------------------------------------
      form: {
        name: '',
        remark: '',
        phone: '',
        region: '',
        type1: 1,
        type2: 1,
        type3: '1'
      },
      topHeight: 0,
      dialogFormVisible: false,
      dialog2: false,
      fileList: [],
      // 投保信息
      baoXian: [{time: '08: 20', address: '山西省太原市小店区研发技术部', type: '1'}, {time: '20: 00', address: '山西省太原市小店区技术部，ddddd', type: '2'}],
      baoXianData: {
        id: ''
      },
      dialog3: false,
      multipleSelection: [],
      // 付款
      dialog4: false,
      val: {
        HtType: '1'
      },
      OrderId: '',
      // 常旅客
      personDialog: false,
      // 销售员工
      saleDialog: false,
      // 修改合同
      contactDialog: false
    }
  },
  created () {
    this.current = Number(this.$route.query.current) || 0
  },
  watch: {
    '$route' (val) {
      this.current = val.query.current
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/order";
</style>
