<template>
  <div class="title">
    <div @click='goBack' class="back-icon"></div>
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'navBar',
  props: ['title'],
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    goBack:function(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.title{
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom:1px solid #ccc;
  text-align: center;
  font-size: 14px;
  color: #000;
  line-height: 40px;
}
.title .back-icon{
  position: absolute;
  left: 0;
  top:0;
  width: 40px;
  height: 40px;
  background: url('./../../assets/img/pre.png') center no-repeat;
  background-size: 9px 16px;
}
</style>
