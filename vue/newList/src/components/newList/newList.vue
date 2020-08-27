<template>
  <div class='pb55 vh'>
    <navBar title="新闻列表"></navBar>
      <router-link v-for="item in datas" :key="item.index" :to='{name:"newDetail",query:{id:item.id}}' class="list bg248">
        <img :src="item.dialog_img" alt="">
        <div class="content vh">
          <p class="w100 title f14">{{item.name}}：{{item.notice}}</p>
          <p class="w100 flex-b f12">
            <span>点击数：{{item.rec_num}}</span>
            <span>时间：{{item.daily_date_show | coverTime('YYYY-MM-DD')}}</span>
          </p>
        </div>
      </router-link>
  </div>
</template>

<script>
import {poster} from '@/api/api.js';
export default {
  name: 'NewList',
  data(){
    return {
      datas:[],
    }
  },
  components: {},
  created(){
    poster({'token': '1b826231ec048ee6010c8a1e62f6ba7f'})
      .then(res=>{
        this.datas = res.data.datas.daily_posters;
      })
  },
  mounted(){},
  methods: {}
}
</script>
<style scoped>
.list {
    width: 98%;
    padding:0 10px;
    margin: 15px auto;
    display: flex;
    justify-content: left;
}

.list img {
    width: 50px;
    height: 50px;
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:5px 0 5px 10px;
}
.content:nth-child(2){
  flex-grow: 1;
}
.title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
