<template>
    <div class="wrapper">
        <arcinfo-box :detailData="detailData" v-if="isDetail"></arcinfo-box>
        <div class="Main">
            <room-list :detailData="detailData" v-if="isDetail"></room-list>
            <recommend :tuiJuanList="tuiJuanList" v-if="isTuiJuan"></recommend>
        </div>
    </div>
</template>
<script>
import ArcinfoBox from './module/ArcInfoBox'
import RoomList from './module/RoomList'
import Recommend from './module/Recommend'
import serverHttp from '@/assets/common/hotel'
export default {
  name: 'ListInfo',
  components: {
    ArcinfoBox: ArcinfoBox,
    RoomList: RoomList,
    Recommend: Recommend
  },
  data () {
    return {
      detailData: {},
      tuiJuanList: [],
      isDetail: false,
      isTuiJuan: false
    }
  },
  methods: {
    getDetail () {
      serverHttp.GetDetailForB2B({Id: this.$route.query.id}).then(res => {
        res.data.imgList = []
        res.data.JDPicture.forEach(item => {
          res.data.imgList.push(item.Picture)
        })
        this.detailData = res.data
        console.log(this.detailData)
        this.isDetail = true
      })
    },
    getTuiJuanList () {
      serverHttp.GetListForTuiJian({Id: this.$route.query.id, SiteLanMuId: this.$route.query.siteLanMuId}).then(res => {
        this.tuiJuanList = res.data
        this.isTuiJuan = true
      })
    }
  },
  mounted () {
    this.getDetail()
    this.getTuiJuanList()
  }
}
</script>
<style lang='scss' scoped>
.Main{
    width: 100%;
    overflow: hidden;
}
</style>
