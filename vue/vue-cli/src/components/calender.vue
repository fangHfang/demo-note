<template>
  <div class="calender-list">
    <div :class="['calender-btn', 'left-btn', {'active-btn': leftValue < 0}]" @click="leftBtn"><i class="el-icon-arrow-left"></i></div>
    <div class="calender-warp">
      <ul class="calender-dateList" :style="[{'left': leftValue + 'px'}, {'width': (140 * list.length) + 'px'}]">
        <li v-for="(item, index) in list" :key="index" :class="['calender-item', {'active-item': current === index}]" @click="chooseDate(item, index)">
          <p>{{item.time}}</p>
          <p>{{item.day}}</p>
        </li>
      </ul>
    </div>
    <div :class="['calender-btn', 'right-btn', {'active-btn': Math.abs(leftValue) < 140 * (list.length - 8)}]" @click="rightBtn"><i class="el-icon-arrow-right"></i></div>
  </div>
</template>

<script>
export default {
  name: 'calender',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      leftValue: 0,
      current: 0
    }
  },
  methods: {
    /**
     * 下一个
     */
    rightBtn () {
      if (Math.abs(this.leftValue) >= 140 * (this.list.length - 8)) {
        return
      }
      this.leftValue += (-140)
      console.log(11)
    },
    /**
     * 上一个
     */
    leftBtn () {
      if (this.leftValue >= 0) {
        return
      }
      this.leftValue -= (-140)
      console.log(11)
    },
    chooseDate (item, index) {
      this.current = index
      this.$emit('chooseDate', item)
    }
  }
}
</script>

<style lang="scss">
.calender-list{
  position: relative;
  background: #F0F0F0;
  height: 62px;
  overflow: hidden;
  .calender-btn{
    position: absolute;
    top: 0;
    width: 40px;
    font-size: 32px;
    font-weight: 800;
    line-height: 60px;
    text-align: center;
    color: #bbb;
    border-bottom: 1px solid #3aa400;
    border-top: 1px solid #E8E8E8;
    z-index: 8;
    background: #F0F0F0;
    cursor: pointer;
  }
  .left-btn{
    left: 0;
  }
  .right-btn{
    right: 0;
  }
  .active-btn{
    &:hover{
      color: #3aa400;
    }
  }
  .calender-warp{
    width: calc(100% - 80px);
    margin: 0 auto;
    position: relative;
    height: 100%;
    .calender-dateList{
      height: 100%;
      position: relative;
      overflow: hidden;
      padding: 0;
      margin: 0;
      transition: all 1s;
      .calender-item{
        width: 140px;
        float: left;
        height: 100%;
        text-align: center;
        border-bottom: 1px solid #3aa400;
        border-top: 1px solid #E8E8E8;
        padding-top: 10px;
        box-sizing: border-box;
        color: #333;
        font-size: 12px;
        line-height: 18px;
        font-weight: 700;
        cursor: pointer;
        &:hover{
          background: #3aa400;
          color: #fff;
        }
      }
      .active-item{
        border-top: 2px solid #3aa400;
        border-left: 1px solid #3aa400;
        border-right: 1px solid #3aa400;
        background: #fff;
        border-bottom-color: #fff;
        &:hover{
          background: #F0F0F0;
          color: #333;
        }
      }
    }
  }
}
</style>
