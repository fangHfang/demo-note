<template>
  <el-dialog
    @close="$emit('close')"
    :visible="show"
    width="30%">
      <div class="img-show">
        <i class="img-icon el-icon-arrow-left" @click="$emit('previous')"></i>
        <img :src="list[index]" alt="">
        <i class="img-icon el-icon-arrow-right" @click="$emit('next')"></i>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'imgDialog',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    show: {
      default: false
    },
    index: {
      default: 0
    }
  }
}
</script>

<style lang="scss">
.img-show{
  position: relative;
  .img-icon{
    width: 55px;
    height: 100px;
    background: rgba(0,0,0,0.4);
    font-size: 42px;
    position: absolute;
    color: #fff;
    line-height: 100px;
    text-align: center;
    top: 35%;
    cursor: pointer;
    opacity: 0;
    &:hover{
      opacity: 1;
    }
  }
  .el-icon-arrow-left{
    left: 0;
  }
  .el-icon-arrow-right{
    right: 0;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
