<template>
    <div class="wrapper">
        <arcinfo-box :detail="detailData" v-if="detailData"></arcinfo-box>
        <div class="Main">
            <room-list :detail="detailData" v-if="detailData"></room-list>
            <recommend :recList="recList" v-if="isTuiJuan"></recommend>
        </div>
    </div>
</template>
<script>
import serverHttp from '@/assets/common/yl_hotel'
import ArcinfoBox from './module/ArcInfoBox'
import RoomList from './module/RoomList'
import Recommend from './module/Recommend'
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
      startDate: '',
      endDate: '',
      hotelId: '',
      recList: [],
      isTuiJuan: false
    }
  },
  created () {
    this.startDate = this.$route.query.startDate
    this.endDate = this.$route.query.endDate
    this.hotelId = this.$route.query.id
  },
  methods: {
    getDetail () {
      let ArrivalDate = this.startDate
      let DepartureDate = this.endDate
      let HotelIds = this.hotelId
      serverHttp.GetDetail({ArrivalDate, DepartureDate, HotelIds, Options: '1,2,3,4'}).then(res => {
        res.data[0].Facilities = res.data[0].Facilities.split(',')
        res.data[0].imgArr = []
        res.data[0].Images.forEach((item, index) => {
          if (index < 20) {
            res.data[0].imgArr.push(item.Locations[0].Url)
          }
        })
        res.data[0].Rooms.forEach(item => {
          item.RatePlans.forEach(ele => {
            res.data[0].ValueAdds.forEach(value => {
              if (value.ValueAddId === ele.ValueAddIds) {
                ele.isZaoCan = value.TypeCode === '01' ? value.IsInclude : false
              }
            })
          })
        })
        this.detailData = res.data[0]
      })
    },
    getTuiJuan () {
      let ArrivalDate = this.$route.query.startDate
      let DepartureDate = this.$route.query.endDate
      let Page = this.$route.query.Page
      let CityId = this.$route.query.CityId
      serverHttp.GetListPage({ArrivalDate, DepartureDate, Page, CityId, ResultType: '1,2,3,4'}).then(res => {
        this.recList = res.data.List.slice(0, 5)
        this.isTuiJuan = true
      })
    }
  },
  mounted () {
    this.getDetail()
    this.getTuiJuan()
  }
}
</script>
<style lang='scss' scoped>
.Main{
    width: 100%;
    overflow: hidden;
}
</style>
