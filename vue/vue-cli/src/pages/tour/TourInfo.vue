<template>
    <div class="wrapper">
        <div class="tourinfo">
            <arcinfo-box :data="data"></arcinfo-box>
            <bottom-nav :data="data"></bottom-nav>
        </div>
    </div>
</template>
<script>
import ArcinfoBox from './module/ArcInfoBox'
import BottomNav from './module/BottomNav'
import serverHttp from '@/assets/common/tour'
export default {
  name: 'TourInfo',
  components: {
    ArcinfoBox: ArcinfoBox,
    BottomNav: BottomNav
  },
  data () {
    return {
      data: {
        Detail: '',
        Price: []
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      serverHttp.GetDetail({
        ResourceId: this.$route.query.id
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data
          localStorage.setItem('tourInfo', JSON.stringify(res.data.Detail))
          localStorage.setItem('tourDatePrice', JSON.stringify(res.data.Price))
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    width: 1200px;
    margin: 0 auto;
}
</style>
