<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // selected: "index"
    }
  },
  methods:{
    // changeHash:function(e){
    //   this.$router.push({name:e})
    // }
  },
  watch: {
    // selected:function(newV,oldV){
    //   this.$router.push({ name: newV});
    // }
  }
};
</script>

<style scoped>
.list{
  height: 34px;
  flex-direction: column;
}
.list img{
  width: 20px;
  height: auto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ;
}
</style>
