<template>
  <div class="views-detail">
    <arcinfo-box :allData="allData" v-if="isArcinfoBox"></arcinfo-box>
    <div class="Main">
      <room-list :allData="allData" v-if="isArcinfoBox"></room-list>
      <recommend :recList="recList" :fujinHotel="fujinHotel" v-if="recList.length>0&&fujinHotel.length>0"></recommend>
    </div>
  </div>
</template>
<script>
import ArcinfoBox from './module/ArcInfoBox'
import RoomList from './module/RoomList'
import Recommend from './module/Recommend'
import serverHttp from '@/assets/common/jingqu'
export default {
  name: 'ListInfo',
  components: {
    ArcinfoBox: ArcinfoBox,
    RoomList: RoomList,
    Recommend: Recommend
  },
  data () {
    return {
      recList: [],
      allData: {},
      isArcinfoBox: false,
      fujinHotel: []
    }
  },
  methods: {
    getDetail () {
      serverHttp.GetDetailForB2B({Id: this.$route.query.id, SiteLanMuId: this.$route.query.siteLanMuId}).then(res => {
        this.allData = res.data
        this.isArcinfoBox = true
      })
    },
    getTuiJuan () {
      serverHttp.GetJiuDianListForZhouBianTuiJian({SiteLanMuId: 'e37265adb2cd413aad6ee61ead857ff5', Id: this.$route.query.id}).then(res => {
        this.recList = res.data
      })
    },
    getFuJin () {
      serverHttp.GetJiuDianListForFuJin({SiteLanMuId: 'e37265adb2cd413aad6ee61ead857ff5', Id: this.$route.query.id}).then(res => {
        this.fujinHotel = res.data
      })
    }
  },
  mounted () {
    this.getDetail()
    this.getTuiJuan()
    this.getFuJin()
  }
}
</script>
<style lang='scss' scoped>
  .views-detail{
    width: 1200px;
    margin: 0 auto;
    .Main{
      width: 100%;
      overflow: hidden;
    }
  }
</style>
