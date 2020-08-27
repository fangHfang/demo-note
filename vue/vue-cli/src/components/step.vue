<template>
  <div class="step-box">
    <ul>
      <li :style="{'width': 'calc(100% /' + list.length + ')'}" v-for="(item, index) in list" :key="index" :class="['step-item', {'choose': index < current}, {'current': index === current}]" @click="qieHuan(item)">
        {{item}}
        <span class="chevron"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'step',
  props: {
    current: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => ['第一步: 基本信息', '第二步: 提交订单', '第三步: 在线支付']
    }
  },
  data () {
    return {
    }
  },
  methods: {
    qieHuan (item) {
      if (localStorage.getItem('updateInfo')) {
        let data = JSON.parse(localStorage.getItem('updateInfo'))
        if (item.charAt(1) === '一') {
          this.$router.push({name: 'tourOrder', query: data})
        } else if (item.charAt(1) === '二') {
          data.current = 1
          this.$router.push({name: 'tourOrder2', query: data})
        } else if (item.charAt(1) === '三') {
          data.current = 2
          this.$router.push({name: 'tourOrder3', query: data})
        } else if (item.charAt(1) === '四') {
          data.current = 3
          this.$router.push({name: 'tourOrder4', query: data})
        } else if (item.charAt(1) === '五') {
          data.current = 4
          this.$router.push({name: 'tourOrder5', query: data})
        }
      }
    }
  }
}
</script>

<style lang="scss">
.step-box{
  width: 100%;
  color: #999;
  font-size: 14px;
  margin:20px 0;
  padding-right: 10px;
  box-sizing: border-box;
  height: 30px;
  .step-item{
    float: left;
    text-align: center;
    line-height: 30px;
    background: #eee;
    position: relative;
    cursor:pointer;
    .chevron{
      position: absolute;
      top: 0;
      right: -12px;
      display: block;
      border: 15px solid transparent;
      border-left: 12px solid #15b659;
      border-right: 0;
      z-index: 1;
      &:before{
        position: absolute;
        top: -15px;
        right: 0;
        display: block;
        content: '';
        border: 15px solid transparent;
        border-left: 12px solid #eee;
        border-right: 0;
        transition: all .21s ease;
      }
    }
  }
  .choose{
    background: #bef6d6;
    color: #15b659;
    .chevron{
      &:before{
        border-left: 12px solid #bef6d6;
      }
    }
  }
  .current{
    background: #15b659;
    color: #fff;
    .chevron{
      &:before{
        border-left: 12px solid #15b659;
      }
    }
  }
}
</style>
