<template>
  <div class=''>
      <navBar title="新闻详情"/>
      <div @click="changeRoute0" class="">000</div>
      <div @click="changeRoute1" class="">111</div>
      <div @click="changeRoute2" class="">222</div>
      <div @click="changeRoute3" class="">333</div>

  </div>
</template>

<script>
export default {
  name: 'newDetail',
  data(){
    return {
      id: null
    }
  },
  components: {},
  created(){
    this.id = this.$route.query.id;
  },
  beforeRouteUpdate:function(to,from,next){
    next()
  },
  mounted(){},
  methods: {
    changeRoute0:function(){
      this.$router.push({name:'newDetail',query:{id:0}})
    },
     changeRoute1:function(){
      this.$router.push({name:'newDetail',query:{id:1}})
    },
     changeRoute2:function(){
      this.$router.push({name:'newDetail',query:{id:2}})
    },
     changeRoute3:function(){
      this.$router.push({name:'newDetail',query:{id:3}})
    }
  }
}
</script>
<style scoped>
</style>
