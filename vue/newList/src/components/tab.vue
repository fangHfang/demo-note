<template>
  <div class='tab'>
      <router-view></router-view>
      <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="index">
                <div @click="changeHash('index','index')" class="flex-b list">
                    <img src="./../assets/img/home1.png" />首页
                </div>
            </mt-tab-item>
            <mt-tab-item id="report" >
                <router-link to='/report?name=report' class="flex-b list" data-id="" replace>
                    <img src="./../assets/img/report1.png" />方案
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="daily">
                <router-link :to="{ name:'daily',query:{name:'daily'} }" class="flex-b list" data-id="daily">
                    <img src="./../assets/img/daily1.png" />日报
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="mine">
                <router-link :to="{ name:'mine',params:{name:'mine'} }" class="flex-b list"  data-id='mine'>
                    <img src="./../assets/img/my1.png" />我的
                </router-link>
            </mt-tab-item>
        </mt-tabbar> 
      </div> 
  </div>
</template>

<script>
export default {
  name: 'tab',
  data(){
    return {
         selected: "index"
    }
  },
  components: {},
  created(){},
  mounted(){
  },
  methods: {
      changeHash:function(path,param){
        this.$router.push( { name:path,query:{name:param}} )
    }
  }
}
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
