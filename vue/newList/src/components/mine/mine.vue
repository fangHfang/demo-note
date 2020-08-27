<template>
  <div class=''>
      <h1>我的</h1>
      <mineNav />
      <router-view />
      <router-view name="helper"></router-view>
  </div>
</template>

<script>
import '../../assets/css/mine.css'
import mineNav from '@/components/mine/mineNav'
export default {
  name: 'mine',
  data(){
    return {}
  },
  components: {mineNav},
  created(){console.log(this.$route.params.name)},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
</style>
