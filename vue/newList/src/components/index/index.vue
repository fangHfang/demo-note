<template>
  <div class="pb55 vh">
    <mt-header title="newList"></mt-header>
    <mt-swipe :auto="4000">
      <mt-swipe-item  v-for="(img, index) in Banners" :key='index'>
        <img :src="img.image" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div>
      <my-ul>
        <my-li v-for="gird in girds" :key="gird.index">
          <router-link :to="gird.router">
            <img :src="gird.img" alt="">
            <p class="f14">{{gird.title}}</p>
          </router-link>
        </my-li>
      </my-ul>
    </div>
    <emitChild @func="getMsgFormSon"></emitChild>
  </div>
</template>

<script>
import emitChild from "@/components/emitChild"
import {miniIndustryIndex3} from "@/api/api.js";
export default {
  name: "index",
  data() {
    return {
      Banners:[],
      girds:[
        {className:'',title:'新闻资讯',img:require('../../assets/img/1.png'),router:{name:'newlist'}},
        {className:'',title:'图文分享',img:require('../../assets/img/1.png'),router:{name:'newlist'}},
        {className:'',title:'商品展示',img:require('../../assets/img/1.png'),router:{name:'newlist'}},
        {className:'',title:'留言反馈',img:require('../../assets/img/1.png'),router:{name:'newlist'}},
        {className:'',title:'搜索资讯',img:require('../../assets/img/1.png'),router:{name:'newlist'}},
        {className:'',title:'联系我们',img:require('../../assets/img/1.png'),router:{name:'newlist'}}
      ],
      msgFormSon: "this is msg"
    };
  },
  components: {emitChild},
  created() {
    miniIndustryIndex3({'partner_id':10001,'token': '56a12415d7dd30770172e452618cd56a'})
      .then(res => {
        let data = res.data.datas;
        this.Banners = data.partner_info.banner_roll;
      });
  },
  mounted() {
  },
  methods: {
    getMsgFormSon(data){
      this.msgFormSon = data;
      console.log(this.msgFormSon)
    }
  }
};
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe {
    height: 200px;
}

.list div {
    width: 33.33333%;
    flex-direction: column;
    padding-top: 15px;
    float: left;
}

.list div img {
    width: 40px;
    height: 40px;
}

.list div p {
    line-height: 28px;
}
</style>
